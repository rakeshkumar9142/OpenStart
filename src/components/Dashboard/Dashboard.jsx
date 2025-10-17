import React, { useEffect, useState } from "react";
import { account } from "../../appwrite/appwrite.js";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Users, 
  Rocket, 
  Lightbulb, 
  Target,
  BookOpen,
  MessageCircle,
  Trophy,
  Calendar,
  TrendingUp,
  Globe,
  Clock,
  Star,
  ArrowRight,
  LogOut,
  User,
  Mail,
  ShieldCheck,
  ChevronRight,
  Zap,
  HeartHandshake
} from "lucide-react";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const userData = await account.get();
        setUser(userData);
      } catch (error) {
        console.error("Auth error:", error);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const handleProjectSpace = () => {
    navigate("/team-dashboard");
  };

  // Mock data for OpenStart platform
  const studentProgress = {
    level: "Explorer",
    xp: 1250,
    nextLevelXp: 2000,
    projectsCompleted: 3,
    skillsLearned: 8,
    collaborationScore: 92,
    globalConnections: 5
  };

  const activeProjects = [
    { 
      id: 1, 
      name: "Eco-Friendly App", 
      team: "Global Green Team", 
      progress: 65,
      nextMilestone: "Prototype Testing",
      deadline: "2024-02-15"
    },
    { 
      id: 2, 
      name: "Community Learning Platform", 
      team: "Education Innovators", 
      progress: 40,
      nextMilestone: "User Research",
      deadline: "2024-03-01"
    }
  ];

  const upcomingSessions = [
    { id: 1, title: "Design Thinking Workshop", time: "Tomorrow, 3:00 PM", mentor: "Sarah Chen" },
    { id: 2, title: "Pitch Practice Session", time: "Feb 12, 4:30 PM", mentor: "Alex Rodriguez" },
    { id: 3, title: "Global Collaboration Meet", time: "Feb 15, 2:00 PM", mentor: "International Teams" }
  ];

  const recentAchievements = [
    { id: 1, title: "First Prototype", description: "Built your first MVP", icon: Rocket, earned: true },
    { id: 2, title: "Global Collaborator", description: "Worked with 5+ countries", icon: Globe, earned: true },
    { id: 3, title: "Pitch Master", description: "Delivered 3 successful pitches", icon: Target, earned: false },
    { id: 4, title: "Mentor Favorite", description: "Received mentor recognition", icon: Star, earned: false }
  ];

  // Professional animations
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    hover: {
      y: -2,
      transition: {
        duration: 0.2
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex justify-center items-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
            <Rocket className="w-6 h-6 text-white" />
          </div>
          <p className="text-gray-600 font-medium">Launching your OpenStart journey...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <motion.div
      initial="initial"
      animate="in"
      variants={pageVariants}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100"
    >
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Rocket className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">OpenStart</h1>
                <p className="text-xs text-gray-500">Global Student Entrepreneurship</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3 bg-blue-50 px-3 py-1 rounded-full">
                <Trophy className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">{studentProgress.xp} XP</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user.name?.charAt(0) || 'S'}
                  </span>
                </div>
                <div className="hidden md:block text-right">
                  <p className="text-sm font-medium text-gray-900">{user.name}am</p>
                  <p className="text-xs text-gray-500">Young Innovator</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Welcome Section */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Welcome back, {user.name}am!
                </h1>
                <p className="text-lg text-gray-600">
                  Ready to build something amazing today? 🌟
                </p>
              </div>
              <div className="flex space-x-3 mt-4 lg:mt-0">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleProjectSpace}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all flex items-center space-x-2"
                >
                  <Rocket className="w-4 h-4" />
                  <span>Project Space</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleLogout}
                  className="px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors flex items-center space-x-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Progress Overview */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {[
              {
                icon: Trophy,
                label: "Your Level",
                value: studentProgress.level,
                description: `${studentProgress.xp} / ${studentProgress.nextLevelXp} XP`,
                color: "yellow"
              },
              {
                icon: Rocket,
                label: "Active Projects",
                value: studentProgress.projectsCompleted,
                description: "Making impact",
                color: "blue"
              },
              {
                icon: Globe,
                label: "Global Connections",
                value: studentProgress.globalConnections,
                description: "Countries collaborated",
                color: "green"
              },
              {
                icon: TrendingUp,
                label: "Collaboration Score",
                value: `${studentProgress.collaborationScore}%`,
                description: "Teamwork rating",
                color: "purple"
              }
            ].map((metric, index) => (
              <motion.div
                key={metric.label}
                variants={cardVariants}
                whileHover="hover"
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{metric.label}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
                    <p className="text-sm text-gray-500 mt-1">{metric.description}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${
                    metric.color === 'yellow' ? 'bg-yellow-50' :
                    metric.color === 'blue' ? 'bg-blue-50' :
                    metric.color === 'green' ? 'bg-green-50' : 'bg-purple-50'
                  }`}>
                    <metric.icon className={`w-6 h-6 ${
                      metric.color === 'yellow' ? 'text-yellow-600' :
                      metric.color === 'blue' ? 'text-blue-600' :
                      metric.color === 'green' ? 'text-green-600' : 'text-purple-600'
                    }`} />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Active Projects */}
            <motion.div
              variants={cardVariants}
              className="xl:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200"
            >
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Rocket className="w-5 h-5 mr-2" />
                  Your Active Projects
                </h2>
              </div>
              
              <div className="p-6 space-y-6">
                {activeProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    whileHover={{ scale: 1.01 }}
                    className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{project.name}</h3>
                        <p className="text-sm text-gray-600 flex items-center mt-1">
                          <Users className="w-4 h-4 mr-1" />
                          {project.team}
                        </p>
                      </div>
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                        {project.progress}%
                      </span>
                    </div>
                    
                    <div className="mb-3">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center text-sm">
                      <div>
                        <p className="text-gray-600">Next: {project.nextMilestone}</p>
                        <p className="text-gray-500 flex items-center mt-1">
                          <Clock className="w-4 h-4 mr-1" />
                          Due {new Date(project.deadline).toLocaleDateString()}
                        </p>
                      </div>
                      <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center">
                        Continue
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </button>
                    </div>
                  </motion.div>
                ))}
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-colors flex items-center justify-center space-x-2"
                >
                  <Plus className="w-5 h-5" />
                  <span>Start New Project</span>
                </motion.button>
              </div>
            </motion.div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Upcoming Sessions */}
              <motion.div
                variants={cardVariants}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Upcoming Sessions
                  </h3>
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    View all
                  </button>
                </div>
                
                <div className="space-y-4">
                  {upcomingSessions.map((session) => (
                    <div key={session.id} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900">{session.title}</p>
                        <p className="text-sm text-gray-600">{session.time}</p>
                        <p className="text-sm text-blue-600">with {session.mentor}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Achievements */}
              <motion.div
                variants={cardVariants}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Trophy className="w-5 h-5 mr-2" />
                  Your Achievements
                </h3>
                
                <div className="grid grid-cols-2 gap-3">
                  {recentAchievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`p-3 rounded-lg text-center ${
                        achievement.earned 
                          ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200' 
                          : 'bg-gray-50 border border-gray-200 opacity-60'
                      }`}
                    >
                      <achievement.icon className={`w-6 h-6 mx-auto mb-2 ${
                        achievement.earned ? 'text-yellow-600' : 'text-gray-400'
                      }`} />
                      <p className={`text-xs font-medium ${
                        achievement.earned ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {achievement.title}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                variants={cardVariants}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Quick Access
                </h3>
                
                <div className="space-y-3">
                  {[
                    { icon: Users, label: "Find Teammates", color: "green" },
                    { icon: Lightbulb, label: "Explore Ideas", color: "yellow" },
                    { icon: MessageCircle, label: "Mentor Chat", color: "blue" },
                    { icon: BookOpen, label: "Learning Hub", color: "purple" }
                  ].map((action) => (
                    <motion.button
                      key={action.label}
                      whileHover={{ x: 4 }}
                      className="w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className={`p-2 rounded-lg ${
                        action.color === 'green' ? 'bg-green-50' :
                        action.color === 'yellow' ? 'bg-yellow-50' :
                        action.color === 'blue' ? 'bg-blue-50' : 'bg-purple-50'
                      }`}>
                        <action.icon className={`w-4 h-4 ${
                          action.color === 'green' ? 'text-green-600' :
                          action.color === 'yellow' ? 'text-yellow-600' :
                          action.color === 'blue' ? 'text-blue-600' : 'text-purple-600'
                        }`} />
                      </div>
                      <span className="font-medium text-gray-900">{action.label}</span>
                      <ChevronRight className="w-4 h-4 text-gray-400 ml-auto" />
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Inspiration Section */}
          <motion.div
            variants={itemVariants}
            className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="mb-6 lg:mb-0">
                <h2 className="text-2xl font-bold mb-2">Ready to make a difference?</h2>
                <p className="text-blue-100">
                  Join thousands of students worldwide who are turning their ideas into impact.
                </p>
              </div>
              <div className="flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:shadow-lg transition-shadow"
                >
                  Share Your Story
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 border border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                >
                  Explore Gallery
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Add the missing Plus icon component
const Plus = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

export default Dashboard;