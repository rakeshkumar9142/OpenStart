const navLinks = [
    { to: "/", text: "Home" },
    {
        text : "Upcoming Cohorts",
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