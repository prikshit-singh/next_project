import { useEffect,useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/layouts/mainLayout";
import axios from "axios";
export default function Page() {
  const router = useRouter();
const [content,setContent]=useState(null)
  useEffect(() => {
    getBlogById();
  }, []);
  const getBlogById = async () => {
    let slug =  router.query.slug;
    if(slug){
      let queryLength = slug.split("-").length;
      let id = await slug.split("-")[queryLength - 1];
      console.log(id);
      const res = await axios.post(`/api/getblogs/getblogbyid`, {id});
      setContent(res.data.blog.content);
    }
   
  };
  console.log(content)
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </>
  );
}
Page.Layout = Layout;
