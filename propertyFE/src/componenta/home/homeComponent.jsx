import "./home.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Send';
// import Stack from '@mui/material/Stack';

export default function Blog() {
  const [Blogs, setBlogs] = useState([]);
    const [update, setUpdate] = useState([false]);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:6969/api/v1/properties");
      setBlogs(res.data.getPropertys);

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
      fetchBlogs();
      console.log(Blogs);
  }, []);

  // const deleteBlog = async (id) =>{
  //   try{
  //       const res = await axios.delete(`http://localhost:2400/api/v1/blogs/delete/${id}`);
  //       if (res.status === 200) {
  //         console.log('Blog deleted successfully');
  //         window.location.reload()
  //       } else {
  //           console.log('Failed to delete blog');
  //       }
  //   }catch (err) {
  //       console.error(err);
  //   }
  // }




  return (
    <div className="home-hero">
      <div className="blog-list">
        {Blogs &&
          Blogs.map((blog) => (
            <div key={blog._id} className="blog" contentEditable={update?true:false}>
              <h1>{blog.title}</h1>
              <p>{blog.description}</p>
              <p>{blog.place}</p>
              <p>{blog.area}</p>
              <p>{blog.bedroom}</p>
              <p>{blog.bathroom}</p>
              <p>{blog.price}</p>
              <h1>{blog.contactInfo}</h1>
              <p>{blog.name}</p>
              <p>{blog.email}</p>
              <p>{blog.phone}</p>
              <h1>{blog.nearbyFacilities}</h1>
              <p>Hospital: {blog.nearbyFacilities.hospital}</p>
<p>College: {blog.nearbyFacilities.college}</p>
<p>Shopping Mall: {blog.nearbyFacilities.shoppingMall}</p>
<p>Public Transport: {blog.nearbyFacilities.publicTransport}</p>

              {/* <div className="buttons">
              <Button variant="outlined"  onClick={()=>deleteBlog(blog._id)} startIcon={<DeleteIcon />}>
        Delete
      </Button>
      {/* <Button variant="contained" onClick={()=>updateBlog(blog._id)} endIcon={<EditIcon />}>
        Edit
      </Button> */}
              {/* </div> */} */}
            </div>
          ))}
         
      </div>
    </div>
  );
}
