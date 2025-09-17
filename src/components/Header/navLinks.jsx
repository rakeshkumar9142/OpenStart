const navLinks = [
    { to: "/", text: "Home" },
    {
        text : "Upcoming Cohorts", 
        className : "text-orange-500 font-bold border-b-2 border-orange-500",
        submenu : [
          { to : "/cohorts/alpha",text : "Cohort Alpha"},
          { to : "/cohorts/beta", text : "Cohort Beta"},
          { to : "/cohorts/gama", text : "Cohort Gamma"},
        ],
    },
    { to: "/about", text: "About" },
    { to: "/mentors", text: "Mentors" },
    { to: "/ShowCase", text: "ShowCase" },
    { to: "/contact", text: "Contact" },
    { to: "/news", text: "News" },
];

export default navLinks;