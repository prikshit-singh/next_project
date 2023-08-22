import axios from "axios";
function generateSiteMap(posts) {
    console.log('posts', posts)
    return `<?xml version="1.0" encoding="UTF-8"?>
     <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
       <!--We manually set the two URLs we know already-->
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
             <loc>${`https://gitgurus.com/blog/${data}`}</loc>
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
        const blog = await axios.get(`https://gitgurus.com/api/getblogs`)
        console.log(new Date())
        const slugObj = await blog.data.blog.map((data) => {
            const slug1 = data.slug.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-') + '-' + `${data._id}`
            return slug1.replaceAll('--', '-');
        })

        console.log(slugObj)
        if (blog.data.CODE === 200) {
            const sitemap = generateSiteMap(slugObj);

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

    // We generate the XML sitemap with the posts data

}

export default SiteMap;