import logo from "./logo.svg";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./PrivateRoute";

import Contact from "./components/Contact";
import Medialibrary from "./components/Medialibrary";
import Settings from "./components/Settings";
import Profilesetting from "./components/Profilesetting";
import Changepassword from "./components/Changepassword";

//Menu
import Menu from "./components/menu/menu";
import AddMenu from "./components/menu/add_menu";
import EditMenu from "./components/menu/edit_menu";
import ViewMenu from "./components/menu/view_menu";

//Sub Menu
import AddSubMenu from "./components/sub_menu/add_sub_menu";
import SubMenu from "./components/sub_menu/sub_menu";
import EditSubMenu from "./components/sub_menu/edit_sub_menu";
import ViewSubMenu from "./components/sub_menu/view_sub_menu";
//SubSub Menu
import AddSubSubMenu from "./components/sub_sub_menu/add_sub_sub_menu";
import SubSubMenu from "./components/sub_sub_menu/sub_sub_menu";
import EditSubSubMenu from "./components/sub_sub_menu/edit_sub_sub_menu";
import ViewSubSubMenu from "./components/sub_sub_menu/view_sub_sub_menu";
//Home1
// import EditHome1 from "./components/home1/edit_home1";
import AddHome1 from "./components/home1/add_home1";
import EditHome1 from "./components/home1/edit_home1";
import ViewHome1 from "./components/home1/view_home1";
import Home1 from "./components/home1/home1";
//AddHome2
//home 1.1 images

import AddHome1_1 from "./components/home1_1/add_home1_1";
import EditHome1_1 from "./components/home1_1/edit_home1_1";
import ViewHome1_1 from "./components/home1_1/view_home1_1";
import Home1_1 from "./components/home1_1/home1_1";
//AddHome2
import Home2 from "./components/home2/home2";
import AddHome2 from "./components/home2/add_home2";
import EditHome2 from "./components/home2/edit_home2";
import ViewHome2 from "./components/home2/view_home2";

//AddHome3
import Home3 from "./components/home3/home3";
import AddHome3 from "./components/home3/add_home3";
import EditHome3 from "./components/home3/edit_home3";
import ViewHome3 from "./components/home3/view_home3";

//AddHome4
import Home4 from "./components/home4/home4";
import AddHome4 from "./components/home4/add_home4";
import EditHome4 from "./components/home4/edit_home4";
import ViewHome4 from "./components/home4/view_home4";

//About2
import About2 from "./components/about2/about2";
import AddAbout2 from "./components/about2/add_about2";
import EditAbout2 from "./components/about2/edit_about2";
import ViewAbout2 from "./components/about2/view_about2";

//About3
import About3 from "./components/about3/about3";
import AddAbout3 from "./components/about3/add_about3";
import EditAbout3 from "./components/about3/edit_about3";
import ViewAbout3 from "./components/about3/view_about3";
//files
import Files from "./components/files/file"
import AddFile from "./components/files/addFile"


//Bloog
import Blog from "./components/blog/edit_blog";

import BlogCategory from "./components/blogcategories/blogcategory";
import AddBlogCategory from "./components/blogcategories/add_blogcategory";
import EditBlogCategory from "./components/blogcategories/edit_blogcategory";
import ViewBlogCategory from "./components/blogcategories/view_blogcategory";

//Article
import Blog1 from "./components/blog1/blog1";
import AddBlog1 from "./components/blog1/add_blog1";
import EditBlog1 from "./components/blog1/edit_blog1";
import ViewBlog1 from "./components/blog1/view_blog1";

//Event Type
import EventCategory from "./components/events/eventcategory";
import Events from "./components/events/eventsdetail";
import EventTypes from "./components/events/event_types";
import AddEvent from "./components/events/add_new_event";

//Gallery
import Gallery from "./components/photo_gallery/gallery";
import AddGallery from "./components/photo_gallery/add_gallery";
import ViewGallery from "./components/photo_gallery/view_gallery";
import EditGallery from "./components/photo_gallery/edit_gallery";

//Videos
import Videos from "./components/Videos/videos";
import AddVideos from "./components/Videos/add_videos";
import ViewVideo from "./components/Videos/view_video";
import EditVideo from "./components/Videos/edit_video";

//press
import Press from "./components/pressreleae/press";
import AddPress from "./components/pressreleae/add_press";
import ViewPress from "./components/pressreleae/view_press";
import EditPress from "./components/pressreleae/edit_press";

// people
import people from "./components/people/people";
import AddPeople from "./components/people/add_people";
import ViewPeople from "./components/people/view_people";
import EditPeople from "./components/people/edit_people";

//Gov Websites
import Gov from "./components/gov_websites/gov";
import AddGov from "./components/gov_websites/add_gov";
import EditGov from "./components/gov_websites/edit_gov";
import ViewGov from "./components/gov_websites/view_gov";
// notification
import Notification from "./components/notifications/notification";
import AddNotification from "./components/notifications/add_notification";
import EditNotification from "./components/notifications/edit_notification";
import ViewNotification from "./components/notifications/view_notification";
//testimonials
import Testimonial from "./components/testimonial/view_testimonial";
import AddTestimonial from "./components/testimonial/add_testimonial";
import ViewTestimonial from "./components/testimonial/viewEachTestimonial";
import EditTestimonial from "./components/testimonial/edit_testimonial";
import EventPast from "./components/events/past_events";
import EventUpcoming from "./components/events/upcoming_events";
import AddEventType from "./components/events/addnewEventType";
import AddEventCat from "./components/events/addnewEventCat";
import EditEventType from "./components/events/editEventType";
import ViewEventType from "./components/events/viewEventType";
import EditEventCat from "./components/events/editEventCat";
import ViewEventCat from "./components/events/viewEventCat";
import ViewEvents from "./components/events/view_events";
import EditEvent from "./components/events/edit_events";
import AddLogos from "./components/site_preferences/add_logos";
import AddAddress from "./components/site_preferences/add_address";
import AddSocialMedia from "./components/site_preferences/add_socialmedia";
import AddCompliances from "./components/site_preferences/add_compliances";
import AddNewCompliance from "./components/site_preferences/add_new_compliance";
import EditCompliance from "./components/site_preferences/edit_compliance";
import AddNewPage from "./components/pages/add_page";
import ViewPages from "./components/pages/pages";
import EditPage from "./components/pages/edit_page";
import People from "./components/people/people";
import Carousal from "./components/carousal/carousal";
import AddCarousal from "./components/carousal/add_carousal";
import ViewCarousal from "./components/carousal/view_carousal";
import EditCarousal from "./components/carousal/edit_carousal";

function Routing() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login}></Route>
        
        <PrivateRoute exact path="/dashboard" component={Dashboard}></PrivateRoute>
        <PrivateRoute exact path="/contact" component={Contact}></PrivateRoute>
        <PrivateRoute exact path="/medialibrary" component={Medialibrary}></PrivateRoute>
        <PrivateRoute exact path="/settin" component={Settings}></PrivateRoute>
        <PrivateRoute exact path="/profile" component={Profilesetting}></PrivateRoute>
        <PrivateRoute exact path="/changepassword" component={Changepassword}></PrivateRoute>
        {/* Menu */}
        <PrivateRoute exact path="/menu" component={Menu}></PrivateRoute>
        <PrivateRoute exact path="/add_menu" component={AddMenu}></PrivateRoute>
        <PrivateRoute exact path="/edit_menu/:_id" component={EditMenu}></PrivateRoute>
        <PrivateRoute exact path="/view_menu/:_id" component={ViewMenu}></PrivateRoute>
        {/* Sub Menu */}
        {/* <PrivateRoute exact path="/menu" component={Menu}></PrivateRoute> */}
        <PrivateRoute exact path="/add_sub_menu" component={AddSubMenu}></PrivateRoute>
        <PrivateRoute exact path="/sub_menu" component={SubMenu}></PrivateRoute>
        <PrivateRoute exact path="/edit_sub_menu/:_id" component={EditSubMenu}></PrivateRoute>
        <PrivateRoute exact path="/view_sub_menu/:_id" component={ViewSubMenu}></PrivateRoute>
        {/* sub sub menu */}
          <PrivateRoute exact path="/add_sub_sub_menu" component={AddSubSubMenu}></PrivateRoute>
        <PrivateRoute exact path="/sub_sub_menu" component={SubSubMenu}></PrivateRoute>
        <PrivateRoute exact path="/edit_sub_sub_menu/:_id" component={EditSubSubMenu}></PrivateRoute>
        <PrivateRoute exact path="/view_sub_sub_menu/:_id" component={ViewSubSubMenu}></PrivateRoute>
        {/* AddHome1 */}

        <PrivateRoute exact path="/home_section_1" component={Home1}></PrivateRoute>
        <PrivateRoute exact path="/add_home1" component={AddHome1}></PrivateRoute>
        {/* <PrivateRoute exact path="/edit_home1/:_id" component={EditHome1}></PrivateRoute> */}
        <PrivateRoute exact path="/files" component={Files}></PrivateRoute>
        <PrivateRoute exact path="/add_file" component={AddFile}></PrivateRoute>

        <PrivateRoute
          exact
          path="/home1/608b912efcc7860015dce5b1"
          component={EditHome1}
        ></PrivateRoute>
        <PrivateRoute exact path="/view_home1/:_id" component={ViewHome1}></PrivateRoute>
        {/* //Home2 */}
        <PrivateRoute exact path="/home_section_2" component={Home2}></PrivateRoute>
        <PrivateRoute exact path="/add_home2" component={AddHome2}></PrivateRoute>
        <PrivateRoute exact path="/edit_home2/:_id" component={EditHome2}></PrivateRoute>
        <PrivateRoute exact path="/view_home2/:_id" component={ViewHome2}></PrivateRoute>
        {/* <PrivateRoute exact path="/view_home2/:_id" component={ViewHome2}></PrivateRoute> */}
        {/* //Home3 */}
        <PrivateRoute exact path="/home_section_3" component={Home3}></PrivateRoute>
        <PrivateRoute exact path="/add_home3" component={AddHome3}></PrivateRoute>
        <PrivateRoute exact path="/edit_home3/:_id" component={EditHome3}></PrivateRoute>
        <PrivateRoute exact path="/view_home3/:_id" component={ViewHome3}></PrivateRoute>

        {/* Home1-1 */}
        <PrivateRoute exact path="/home_section_1_1" component={Home1_1}></PrivateRoute>
        <PrivateRoute exact path="/add_home1_1" component={AddHome1_1}></PrivateRoute>
        <PrivateRoute exact path="/edit_home1_1/:_id" component={EditHome1_1}></PrivateRoute>
        <PrivateRoute exact path="/view_home1_1/:_id" component={ViewHome1_1}></PrivateRoute>

        {/* //Home4 */}
        <PrivateRoute exact path="/home_section_4" component={Home4}></PrivateRoute>
        <PrivateRoute exact path="/add_home4" component={AddHome4}></PrivateRoute>
        <PrivateRoute exact path="/edit_home4/:_id" component={EditHome4}></PrivateRoute>
        <PrivateRoute exact path="/view_home4/:_id" component={ViewHome4}></PrivateRoute>
        {/* Testimonials*/}
        <PrivateRoute exact path="/testimonials" component={Testimonial}></PrivateRoute>
        <PrivateRoute exact path="/add_testimonial" component={AddTestimonial}></PrivateRoute>
        <PrivateRoute
          exact
          path="/edit_testimonial/:_id"
          component={EditTestimonial}
        ></PrivateRoute>
        <PrivateRoute
          exact
          path="/view_testimonial/:_id"
          component={ViewTestimonial}
        ></PrivateRoute>
        {/* //About2 */}
        <PrivateRoute exact path="/about_section_2" component={About2}></PrivateRoute>
        <PrivateRoute exact path="/add_about2" component={AddAbout2}></PrivateRoute>
        <PrivateRoute exact path="/edit_about2/:_id" component={EditAbout2}></PrivateRoute>
        <PrivateRoute exact path="/view_about2/:_id" component={ViewAbout2}></PrivateRoute>
        {/* //About3 */}
        <PrivateRoute exact path="/about_section_3" component={About3}></PrivateRoute>
        <PrivateRoute exact path="/add_about3" component={AddAbout3}></PrivateRoute>
        <PrivateRoute exact path="/edit_about3/:_id" component={EditAbout3}></PrivateRoute>
        <PrivateRoute exact path="/view_about3/:_id" component={ViewAbout3}></PrivateRoute>
        {/* Blog */}
        <PrivateRoute exact path="/blog" component={Blog}></PrivateRoute>

        <PrivateRoute exact path="/blogcategory" component={BlogCategory}></PrivateRoute>
        <PrivateRoute
          exact
          path="/add_blogcategory"
          component={AddBlogCategory}
        ></PrivateRoute>
        <PrivateRoute
          exact
          path="/edit_blogcategory/:_id"
          component={EditBlogCategory}
        ></PrivateRoute>
        <PrivateRoute
          exact
          path="/view_blogcategory/:_id"
          component={ViewBlogCategory}
        ></PrivateRoute>

        {/* Article */}
        <PrivateRoute exact path="/article" component={Blog1}></PrivateRoute>
        <PrivateRoute exact path="/add_article" component={AddBlog1}></PrivateRoute>
        <PrivateRoute exact path="/edit_article/:_id" component={EditBlog1}></PrivateRoute>
        <PrivateRoute exact path="/view_article/:_id" component={ViewBlog1}></PrivateRoute>
        {/* photo_gallery */}
        <PrivateRoute exact path="/gallery" component={Gallery}></PrivateRoute>
        <PrivateRoute exact path="/add_gallery" component={AddGallery}></PrivateRoute>
        <PrivateRoute exact path="/view_gallery/:id" component={ViewGallery}></PrivateRoute>
        <PrivateRoute exact path="/edit_gallery/:id" component={EditGallery}></PrivateRoute>
        {/* carousal */}
        <PrivateRoute exact path="/carousal" component={Carousal}></PrivateRoute>
        <PrivateRoute exact path="/add_carousal" component={AddCarousal}></PrivateRoute>
        <PrivateRoute exact path="/view_carousal/:id" component={ViewCarousal}></PrivateRoute>
        <PrivateRoute exact path="/edit_carousal/:id" component={EditCarousal}></PrivateRoute>
        {/* Videos */}
        <PrivateRoute exact path="/videos" component={Videos}></PrivateRoute>
        <PrivateRoute exact path="/add_videos" component={AddVideos}></PrivateRoute>
        <PrivateRoute exact path="/view_video/:id" component={ViewVideo}></PrivateRoute>
        <PrivateRoute exact path="/edit_video/:id" component={EditVideo}></PrivateRoute>
        {/* pressreleae */}
        <PrivateRoute exact path="/press" component={Press}></PrivateRoute>
        <PrivateRoute exact path="/add_press" component={AddPress}></PrivateRoute>
        <PrivateRoute exact path="/view_press/:id" component={ViewPress}></PrivateRoute>
        <PrivateRoute exact path="/edit_press/:id" component={EditPress}></PrivateRoute>
        {/* notification */}
        <PrivateRoute exact path="/notification" component={Notification}></PrivateRoute>
        <PrivateRoute
          exact
          path="/add_notification"
          component={AddNotification}
        ></PrivateRoute>
        <PrivateRoute
          exact
          path="/view_notification/:id"
          component={ViewNotification}
        ></PrivateRoute>
        <PrivateRoute
          exact
          path="/edit_notification/:id"
          component={EditNotification}
        ></PrivateRoute>
        {/* Events */}
        <PrivateRoute exact path="/eventcategory" component={EventCategory}></PrivateRoute>
        <PrivateRoute exact path="/add_new_event" component={AddEvent}></PrivateRoute>
        <PrivateRoute exact path="/view_events/:_id" component={ViewEvents}></PrivateRoute>
        <PrivateRoute exact path="/edit_event/:_id" component={EditEvent}></PrivateRoute>
        <PrivateRoute exact path="/event_types" component={EventTypes}></PrivateRoute>
        <PrivateRoute exact path="/event_category" component={EventCategory}></PrivateRoute>
        <PrivateRoute
          exact
          path="/add_new_event_type"
          component={AddEventType}
        ></PrivateRoute>
        <PrivateRoute
          exact
          path="/edit_event_type/:_id"
          component={EditEventType}
        ></PrivateRoute>
        <PrivateRoute
          exact
          path="/view_event_type/:_id"
          component={ViewEventType}
        ></PrivateRoute>
        <PrivateRoute
          exact
          path="/edit_event_cat/:_id"
          component={EditEventCat}
        ></PrivateRoute>
        <PrivateRoute
          exact
          path="/view_event_cat/:_id"
          component={ViewEventCat}
        ></PrivateRoute>
        <PrivateRoute exact path="/add_new_event_cat" component={AddEventCat}></PrivateRoute>
        <PrivateRoute exact path="/past_events" component={EventPast}></PrivateRoute>
        <PrivateRoute exact path="/upcomming_events" component={EventUpcoming}></PrivateRoute>
        <PrivateRoute exact path="/events" component={Events}></PrivateRoute>
        <PrivateRoute exact path="/events" component={Events}></PrivateRoute>
        {/* Site Preferences */}
        <PrivateRoute exact path="/add_logos" component={AddLogos}></PrivateRoute>
        <PrivateRoute exact path="/add_address" component={AddAddress}></PrivateRoute>
        <PrivateRoute exact path="/add_socialmedia" component={AddSocialMedia}></PrivateRoute>
        <PrivateRoute exact path="/add_compliance" component={AddCompliances}></PrivateRoute>
        <PrivateRoute
          exact
          path="/add_new_compliance"
          component={AddNewCompliance}
        ></PrivateRoute>
        <PrivateRoute
          exact
          path="/edit_compliance/:_id"
          component={EditCompliance}
        ></PrivateRoute>
        {/* Pages */}


        <PrivateRoute exact path="/all_pages" component={ViewPages}></PrivateRoute>
        <PrivateRoute exact path="/add_page" component={AddNewPage}></PrivateRoute>
        <PrivateRoute exact path="/edit_page/:_id" component={EditPage}></PrivateRoute>
        {/* people */}
        <PrivateRoute exact path="/people" component={People}></PrivateRoute>
        <PrivateRoute exact path="/add_people" component={AddPeople}></PrivateRoute>
        <PrivateRoute exact path="/view_people/:id" component={ViewPeople}></PrivateRoute>
        <PrivateRoute exact path="/edit_people/:id" component={EditPeople}></PrivateRoute>
        {/* Websited */}
        <PrivateRoute exact path="/websites" component={Gov}></PrivateRoute>
        <PrivateRoute exact path="/add_websites" component={AddGov}></PrivateRoute>
        <PrivateRoute exact path="/view_websites/:id" component={ViewGov}></PrivateRoute>
        <PrivateRoute exact path="/edit_websites/:id" component={EditGov}></PrivateRoute>
        <PrivateRoute exact path="/settings" component={Changepassword}></PrivateRoute>
      </Switch>
    </Router>
  );
}

export default Routing;
