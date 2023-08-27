import axios from "axios";
function generateSiteMap(posts) {
  console.log(posts)
  return `<?xml version="1.0" encoding="UTF-8"?>
     <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
       <url>
         <loc>https://gitgurus.com</loc>
        
       </url>
       <url>
         <loc>https://gitgurus.com/write</loc>
        
       </url>
       <url>
         <loc>https://gitgurus.com/login</loc>
        
       </url>
       <url>
         <loc>https://gitgurus.com/signup</loc>
        
       </url>
       ${posts
      .map((data) => {
        return `
         <url>
             <loc>${`${data.url}`}</loc>
             
         </url>
        
       `;
      })
      .join('')}
     </urlset>
   `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {

  try {
    const blog = await axios.get(`https://gitgurus.com/api/sitemap`)
    if (blog.data.CODE === 200) {
      const sitemap = generateSiteMap(blog.data.blog);

      res.setHeader('Content-Type', 'text/xml');
      // we send the XML to the browser
      res.write(sitemap);
      res.end();
    }


    return {
      props: {},
    };
  } catch (error) {
    console.log(error)
    return {
      props: {}
    };
  }

}

export default SiteMap;





{/* <lastmod>${posts[0].createdDate}</lastmod>
<changefreq>daily</changefreq>
<priority>1.0</priority>
<lastmod>${posts[0].createdDate}</lastmod>
<changefreq>daily</changefreq>
<priority>1.0</priority>
<lastmod>${posts[0].createdDate}</lastmod>
<changefreq>daily</changefreq>
<priority>1.0</priority>
<lastmod>${posts[0].createdDate}</lastmod>
<changefreq>daily</changefreq>
<priority>1.0</priority> */}