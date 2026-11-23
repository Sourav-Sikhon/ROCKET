# Image helpers (System.Drawing + a little C#) for asset preparation.
Add-Type -AssemblyName System.Drawing
Add-Type -TypeDefinition @'
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
public static class Img {
  public static Bitmap Load(string p){ using(var i=new Bitmap(p)){ return new Bitmap(i);} }
  public static Bitmap Crop(Bitmap s,int x,int y,int w,int h){ var b=new Bitmap(w,h,PixelFormat.Format32bppArgb); using(var g=Graphics.FromImage(b)){ g.DrawImage(s,new Rectangle(0,0,w,h),new Rectangle(x,y,w,h),GraphicsUnit.Pixel);} return b; }
  public static Bitmap ScaleW(Bitmap s,int w){ int h=(int)Math.Round(s.Height*(w/(double)s.Width)); var b=new Bitmap(w,h,PixelFormat.Format32bppArgb); using(var g=Graphics.FromImage(b)){ g.InterpolationMode=InterpolationMode.HighQualityBicubic; g.SmoothingMode=SmoothingMode.HighQuality; g.PixelOffsetMode=PixelOffsetMode.HighQuality; g.DrawImage(s,0,0,w,h);} return b; }
  public static void Grid(Bitmap b,int step){ using(var g=Graphics.FromImage(b)){ var pen=new Pen(Color.FromArgb(160,255,0,0),1); var f=new Font("Arial",11,FontStyle.Bold); for(int x=0;x<b.Width;x+=step){ g.DrawLine(pen,x,0,x,b.Height); g.DrawString(x.ToString(),f,Brushes.Red,x+2,2);} for(int y=0;y<b.Height;y+=step){ g.DrawLine(pen,0,y,b.Width,y); g.DrawString(y.ToString(),f,Brushes.Red,2,y+2);} } }
  // bounding boxes of vertical groups of near-white pixels (x < xmax), split where >= gap empty rows
  public static string WhiteGroups(Bitmap b,int xmax,int lumMin,int gap){
    var rows=new List<int[]>(); var occ=new bool[b.Height]; var minx=new int[b.Height]; var maxx=new int[b.Height];
    for(int y=0;y<b.Height;y++){ minx[y]=int.MaxValue; maxx[y]=-1; for(int x=0;x<Math.Min(xmax,b.Width);x++){ var c=b.GetPixel(x,y); int l=(c.R*3+c.G*6+c.B)/10; if(l>=lumMin){ occ[y]=true; if(x<minx[y])minx[y]=x; if(x>maxx[y])maxx[y]=x; } } }
    var sb=new System.Text.StringBuilder(); int start=-1,empty=0,gx0=int.MaxValue,gx1=-1;
    for(int y=0;y<=b.Height;y++){
      bool o=y<b.Height&&occ[y];
      if(o){ if(start<0){start=y;gx0=int.MaxValue;gx1=-1;} empty=0; if(minx[y]<gx0)gx0=minx[y]; if(maxx[y]>gx1)gx1=maxx[y]; }
      else if(start>=0){ empty++; if(empty>=gap||y==b.Height){ sb.AppendLine("group y "+start+".."+(y-empty)+"  x "+gx0+".."+gx1); start=-1; empty=0; } }
    }
    return sb.ToString();
  }
  // white-on-transparent mask from a purple/white source: alpha grows with luminance above bgLum
  public static Bitmap WhiteMask(Bitmap s,int bgLum,Color tint){ var b=new Bitmap(s.Width,s.Height,PixelFormat.Format32bppArgb); for(int y=0;y<s.Height;y++)for(int x=0;x<s.Width;x++){ var c=s.GetPixel(x,y); double l=(c.R*0.3+c.G*0.59+c.B*0.11); double a=(l-bgLum)/(255.0-bgLum); a=(a-0.08)/0.84; if(a<0)a=0; if(a>1)a=1; b.SetPixel(x,y,Color.FromArgb((int)(a*255),tint.R,tint.G,tint.B)); } return b; }
  // Cut out the subject: flood the light grey backdrop from the borders (pixels stay if not backdrop-like).
  public static Bitmap Matte(Bitmap s,int lumMin,int maxChroma){
    int w=s.Width,h=s.Height; var bg=new bool[w*h]; var q=new Queue<int>();
    Func<int,int,bool> like=(x,y)=>{ var c=s.GetPixel(x,y); int mx=Math.Max(c.R,Math.Max(c.G,c.B)), mn=Math.Min(c.R,Math.Min(c.G,c.B)); int l=(c.R*3+c.G*6+c.B)/10; return l>=lumMin && (mx-mn)<=maxChroma; };
    Action<int,int> seed=(x,y)=>{ int i=y*w+x; if(!bg[i]&&like(x,y)){bg[i]=true;q.Enqueue(i);} };
    for(int x=0;x<w;x++){ seed(x,0); } for(int y=0;y<h-200;y++){ seed(0,y); seed(w-1,y); }
    int[] dx={1,-1,0,0}, dy={0,0,1,-1};
    while(q.Count>0){ int i=q.Dequeue(); int x=i%w,y=i/w; for(int k=0;k<4;k++){ int nx=x+dx[k],ny=y+dy[k]; if(nx<0||ny<0||nx>=w||ny>=h)continue; int j=ny*w+nx; if(bg[j])continue; if(like(nx,ny)){bg[j]=true;q.Enqueue(j);} } }
    var o=new Bitmap(w,h,PixelFormat.Format32bppArgb);
    for(int y=0;y<h;y++)for(int x=0;x<w;x++){
      int i=y*w+x; if(bg[i]){ o.SetPixel(x,y,Color.FromArgb(0,0,0,0)); continue; }
      bool near1=false,near2=false;
      for(int oy=-2;oy<=2&&!near1;oy++)for(int ox=-2;ox<=2;ox++){ int nx=x+ox,ny=y+oy; if(nx<0||ny<0||nx>=w||ny>=h)continue; if(bg[ny*w+nx]){ if(Math.Abs(ox)<=1&&Math.Abs(oy)<=1){near1=true;break;} near2=true; } }
      var c=s.GetPixel(x,y); int a=near1?150:(near2?215:255); o.SetPixel(x,y,Color.FromArgb(a,c.R,c.G,c.B));
    }
    return o;
  }
  public static Rectangle AlphaBox(Bitmap b,int thr){ int x0=b.Width,y0=b.Height,x1=-1,y1=-1; for(int y=0;y<b.Height;y++)for(int x=0;x<b.Width;x++){ if(b.GetPixel(x,y).A>thr){ if(x<x0)x0=x; if(x>x1)x1=x; if(y<y0)y0=y; if(y>y1)y1=y; } } return new Rectangle(x0,y0,x1-x0+1,y1-y0+1); }
  public static void SaveJpg(Bitmap b,string p,long q){ var enc=Array.Find(ImageCodecInfo.GetImageEncoders(),e=>e.MimeType=="image/jpeg"); var ps=new EncoderParameters(1); ps.Param[0]=new EncoderParameter(System.Drawing.Imaging.Encoder.Quality,q); b.Save(p,enc,ps); }
}
'@ -ReferencedAssemblies System.Drawing
