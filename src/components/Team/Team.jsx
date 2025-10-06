import React, { useEffect, useState, useMemo } from "react";
import { databases } from "../../appwrite/appwrite.js";

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_TABLE_ID_CONTACTS;

export default function ContactTable() {
  const [contacts, setContacts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [selectedContact, setSelectedContact] = useState(null);
  const [viewMode, setViewMode] = useState("table");
  const [stats, setStats] = useState({ total: 0, countries: 0, recent: 0 });
  const [notes, setNotes] = useState({});
  const [remarks, setRemarks] = useState({});
  const [editingNote, setEditingNote] = useState(null);
  const [editingRemark, setEditingRemark] = useState(null);
  const [noteText, setNoteText] = useState("");
  const [remarkText, setRemarkText] = useState("");
  const [activeTab, setActiveTab] = useState("details"); // 'details', 'notes', 'remarks'

  // Load notes and remarks from localStorage on component mount
  useEffect(() => {
    const savedNotes = localStorage.getItem('contact-notes');
    const savedRemarks = localStorage.getItem('contact-remarks');
    
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
    if (savedRemarks) {
      setRemarks(JSON.parse(savedRemarks));
    }
  }, []);

  // Enhanced fetch with error handling
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true);
        const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
        const contactsData = res.documents;
        setContacts(contactsData);
        setFiltered(contactsData);
        
        // Calculate stats
        const uniqueCountries = new Set(contactsData.map(c => c.country)).size;
        const recentContacts = contactsData.filter(c => {
          const createdDate = new Date(c.$createdAt);
          const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
          return createdDate > weekAgo;
        }).length;

        setStats({
          total: contactsData.length,
          countries: uniqueCountries,
          recent: recentContacts
        });
      } catch (err) {
        console.error("Error fetching contacts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  // Enhanced search with debouncing
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!search) {
        setFiltered(contacts);
      } else {
        const q = search.toLowerCase();
        setFiltered(
          contacts.filter(
            (c) =>
              c.first_name?.toLowerCase().includes(q) ||
              c.last_name?.toLowerCase().includes(q) ||
              c.email?.toLowerCase().includes(q) ||
              c.country?.toLowerCase().includes(q) ||
              c.phone?.includes(q) ||
              notes[c.$id]?.toLowerCase().includes(q) ||
              remarks[c.$id]?.toLowerCase().includes(q)
          )
        );
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [search, contacts, notes, remarks]);

  // Sorting with useMemo for better performance
  const sortedContacts = useMemo(() => {
    if (!sortConfig.key) return filtered;

    return [...filtered].sort((a, b) => {
      const valA = a[sortConfig.key] || "";
      const valB = b[sortConfig.key] || "";

      if (typeof valA === "number" && typeof valB === "number") {
        return sortConfig.direction === "asc" ? valA - valB : valB - valA;
      }
      return sortConfig.direction === "asc"
        ? valA.toString().localeCompare(valB.toString())
        : valB.toString().localeCompare(valA.toString());
    });
  }, [filtered, sortConfig]);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleContactClick = (contact) => {
    setSelectedContact(selectedContact?.$id === contact.$id ? null : contact);
    setActiveTab("details");
    setEditingNote(null);
    setEditingRemark(null);
  };

  // Notes functionality
  const handleAddNote = (contactId) => {
    setEditingNote(contactId);
    setNoteText(notes[contactId] || "");
  };

  const handleSaveNote = (contactId) => {
    const updatedNotes = { ...notes, [contactId]: noteText };
    setNotes(updatedNotes);
    localStorage.setItem('contact-notes', JSON.stringify(updatedNotes));
    setEditingNote(null);
    setNoteText("");
  };

  const handleCancelNote = () => {
    setEditingNote(null);
    setNoteText("");
  };

  const handleDeleteNote = (contactId) => {
    const updatedNotes = { ...notes };
    delete updatedNotes[contactId];
    setNotes(updatedNotes);
    localStorage.setItem('contact-notes', JSON.stringify(updatedNotes));
  };

  // Remarks functionality
  const handleAddRemark = (contactId) => {
    setEditingRemark(contactId);
    setRemarkText(remarks[contactId] || "");
  };

  const handleSaveRemark = (contactId) => {
    const updatedRemarks = { ...remarks, [contactId]: remarkText };
    setRemarks(updatedRemarks);
    localStorage.setItem('contact-remarks', JSON.stringify(updatedRemarks));
    setEditingRemark(null);
    setRemarkText("");
  };

  const handleCancelRemark = () => {
    setEditingRemark(null);
    setRemarkText("");
  };

  const handleDeleteRemark = (contactId) => {
    const updatedRemarks = { ...remarks };
    delete updatedRemarks[contactId];
    setRemarks(updatedRemarks);
    localStorage.setItem('contact-remarks', JSON.stringify(updatedRemarks));
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();
  };

  const getCountryFlag = (country) => {
    const flagMap = {
      'usa': '🇺🇸',
      'united states': '🇺🇸',
      'canada': '🇨🇦',
      'uk': '🇬🇧',
      'united kingdom': '🇬🇧',
      'germany': '🇩🇪',
      'france': '🇫🇷',
      'spain': '🇪🇸',
      'italy': '🇮🇹',
      'japan': '🇯🇵',
      'australia': '🇦🇺',
      'brazil': '🇧🇷',
      'india': '🇮🇳',
      'china': '🇨🇳',
    };
    return flagMap[country?.toLowerCase()] || '🌍';
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-64 space-y-4">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        <p className="text-gray-600 animate-pulse">Loading contacts...</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Enhanced Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              OpenStart Contacts
            </h1>
            <p className="text-gray-600 mt-1">Manage and explore your network</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <input
                type="text"
                placeholder="Search contacts, notes, remarks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full transition-all duration-200"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("table")}
                className={`px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                  viewMode === "table" 
                    ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25" 
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Table
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                  viewMode === "grid" 
                    ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25" 
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Grid
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-blue-500 rounded-lg mr-4">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-blue-600 font-medium">Total Contacts</p>
                <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-green-500 rounded-lg mr-4">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-green-600 font-medium">Countries</p>
                <p className="text-2xl font-bold text-gray-800">{stats.countries}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-purple-500 rounded-lg mr-4">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-purple-600 font-medium">Recent (7d)</p>
                <p className="text-2xl font-bold text-gray-800">{stats.recent}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-orange-500 rounded-lg mr-4">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-orange-600 font-medium">With Notes</p>
                <p className="text-2xl font-bold text-gray-800">{Object.keys(notes).filter(id => notes[id].trim()).length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content based on view mode */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200 shadow-sm">
          <svg className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No contacts found</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            {search ? `No results for "${search}". Try adjusting your search terms.` : "No contacts available."}
          </p>
        </div>
      ) : viewMode === "table" ? (
        /* Enhanced Table View */
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                {[
                  { key: "first_name", label: "First Name" },
                  { key: "last_name", label: "Last Name" },
                  { key: "email", label: "Email" },
                  { key: "graduation_year", label: "Graduation Year" },
                  { key: "country", label: "Country" },
                  { key: "phone", label: "Phone" },
                  { key: "notes", label: "Notes" }
                ].map(({ key, label }) => (
                  <th
                    key={key}
                    className="py-4 px-4 text-left font-semibold cursor-pointer transition-colors duration-200 hover:bg-white/20"
                    onClick={() => handleSort(key)}
                  >
                    <div className="flex items-center">
                      {label}
                      {sortConfig.key === key && (
                        <span className="ml-1">
                          {sortConfig.direction === "asc" ? "↑" : "↓"}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedContacts.map((contact, index) => (
                <React.Fragment key={contact.$id}>
                  <tr
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-blue-50 transition-all duration-200 cursor-pointer group`}
                    onClick={() => handleContactClick(contact)}
                  >
                    <td className="py-4 px-4 border-b border-gray-200">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3 shadow-sm">
                          {getInitials(contact.first_name, contact.last_name)}
                        </div>
                        {contact.first_name}
                      </div>
                    </td>
                    <td className="py-4 px-4 border-b border-gray-200 font-medium">{contact.last_name}</td>
                    <td className="py-4 px-4 border-b border-gray-200">
                      <a
                        href={`mailto:${contact.email}`}
                        className="text-blue-600 hover:text-blue-800 underline transition-colors duration-200 flex items-center"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {contact.email}
                      </a>
                    </td>
                    <td className="py-4 px-4 border-b border-gray-200">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">
                        {contact.graduation_year}
                      </span>
                    </td>
                    <td className="py-4 px-4 border-b border-gray-200">
                      <div className="flex items-center">
                        <span className="text-xl mr-2">{getCountryFlag(contact.country)}</span>
                        {contact.country}
                      </div>
                    </td>
                    <td className="py-4 px-4 border-b border-gray-200">
                      {contact.phone && (
                        <a
                          href={`tel:${contact.phone}`}
                          className="text-gray-600 hover:text-gray-800 transition-colors duration-200 flex items-center"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          {contact.phone}
                        </a>
                      )}
                    </td>
                    <td className="py-4 px-4 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <span className={`text-sm max-w-xs truncate ${notes[contact.$id] ? 'text-gray-700' : 'text-gray-400'}`}>
                          {notes[contact.$id] || "No notes"}
                        </span>
                        {notes[contact.$id] && (
                          <svg className="h-4 w-4 text-blue-500 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h2m0 0l2-2m-2 2l2 2m-6 2h6a2 2 0 002-2V9a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                          </svg>
                        )}
                      </div>
                    </td>
                  </tr>
                  
                  {/* Expanded Contact Details */}
                  {selectedContact?.$id === contact.$id && (
                    <tr className="bg-blue-25 transition-all duration-300">
                      <td colSpan="7" className="px-4 py-6 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200">
                        <div className="mb-4">
                          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                            {['details', 'notes', 'remarks'].map((tab) => (
                              <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 capitalize ${
                                  activeTab === tab
                                    ? 'bg-white text-blue-600 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-800'
                                }`}
                              >
                                {tab}
                              </button>
                            ))}
                          </div>
                        </div>

                        {activeTab === 'details' && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                                <svg className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Contact Details
                              </h4>
                              <div className="space-y-2 text-sm">
                                <p><span className="font-medium text-gray-700">Name:</span> {contact.first_name} {contact.last_name}</p>
                                <p><span className="font-medium text-gray-700">Email:</span> {contact.email}</p>
                                <p><span className="font-medium text-gray-700">Phone:</span> {contact.phone || "Not provided"}</p>
                                <p><span className="font-medium text-gray-700">Location:</span> {contact.country}</p>
                                <p><span className="font-medium text-gray-700">Graduation:</span> {contact.graduation_year}</p>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                                <svg className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Quick Actions
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center">
                                  <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                  </svg>
                                  Email
                                </button>
                                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center">
                                  <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                  </svg>
                                  Call
                                </button>
                                <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center">
                                  <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                  </svg>
                                  Message
                                </button>
                              </div>
                            </div>
                          </div>
                        )}

                        {activeTab === 'notes' && (
                          <div className="space-y-4">
                            <div className="flex justify-between items-center">
                              <h4 className="font-semibold text-gray-800 flex items-center">
                                <svg className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                Personal Notes
                              </h4>
                              {!editingNote && (
                                <button
                                  onClick={() => handleAddNote(contact.$id)}
                                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center"
                                >
                                  <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                  </svg>
                                  {notes[contact.$id] ? 'Edit Note' : 'Add Note'}
                                </button>
                              )}
                            </div>

                            {editingNote === contact.$id ? (
                              <div className="space-y-3">
                                <textarea
                                  value={noteText}
                                  onChange={(e) => setNoteText(e.target.value)}
                                  placeholder="Enter your notes about this contact..."
                                  className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                />
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => handleSaveNote(contact.$id)}
                                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                                  >
                                    Save Note
                                  </button>
                                  <button
                                    onClick={handleCancelNote}
                                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                                  >
                                    Cancel
                                  </button>
                                  {notes[contact.$id] && (
                                    <button
                                      onClick={() => handleDeleteNote(contact.$id)}
                                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                                    >
                                      Delete
                                    </button>
                                  )}
                                </div>
                              </div>
                            ) : (
                              <div>
                                {notes[contact.$id] ? (
                                  <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                                    <p className="text-gray-700 whitespace-pre-wrap">{notes[contact.$id]}</p>
                                    <p className="text-xs text-gray-500 mt-2">
                                      Last updated: {formatDate(Date.now())}
                                    </p>
                                  </div>
                                ) : (
                                  <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                                    <svg className="h-12 w-12 mx-auto mb-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    <p>No notes yet. Click "Add Note" to add personal notes about this contact.</p>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        )}

                        {activeTab === 'remarks' && (
                          <div className="space-y-4">
                            <div className="flex justify-between items-center">
                              <h4 className="font-semibold text-gray-800 flex items-center">
                                <svg className="h-5 w-5 mr-2 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                </svg>
                                Remarks & Comments
                              </h4>
                              {!editingRemark && (
                                <button
                                  onClick={() => handleAddRemark(contact.$id)}
                                  className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center"
                                >
                                  <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                  </svg>
                                  {remarks[contact.$id] ? 'Edit Remarks' : 'Add Remarks'}
                                </button>
                              )}
                            </div>

                            {editingRemark === contact.$id ? (
                              <div className="space-y-3">
                                <textarea
                                  value={remarkText}
                                  onChange={(e) => setRemarkText(e.target.value)}
                                  placeholder="Enter remarks or comments about this contact..."
                                  className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                                />
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => handleSaveRemark(contact.$id)}
                                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                                  >
                                    Save Remarks
                                  </button>
                                  <button
                                    onClick={handleCancelRemark}
                                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                                  >
                                    Cancel
                                  </button>
                                  {remarks[contact.$id] && (
                                    <button
                                      onClick={() => handleDeleteRemark(contact.$id)}
                                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                                    >
                                      Delete
                                    </button>
                                  )}
                                </div>
                              </div>
                            ) : (
                              <div>
                                {remarks[contact.$id] ? (
                                  <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                                    <p className="text-gray-700 whitespace-pre-wrap">{remarks[contact.$id]}</p>
                                    <p className="text-xs text-gray-500 mt-2">
                                      Last updated: {formatDate(Date.now())}
                                    </p>
                                  </div>
                                ) : (
                                  <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                                    <svg className="h-12 w-12 mx-auto mb-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                    </svg>
                                    <p>No remarks yet. Click "Add Remarks" to add comments about this contact.</p>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* Grid View with Notes & Remarks */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedContacts.map((contact) => (
            <div
              key={contact.$id}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer group"
              onClick={() => handleContactClick(contact)}
            >
              <div className="text-center mb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {getInitials(contact.first_name, contact.last_name)}
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  {contact.first_name} {contact.last_name}
                </h3>
                <p className="text-gray-600 text-sm mt-1">{contact.email}</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <svg className="h-4 w-4 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                    Class of {contact.graduation_year}
                  </span>
                </div>
                
                <div className="flex items-center text-sm">
                  <span className="text-lg mr-2">{getCountryFlag(contact.country)}</span>
                  <span className="text-gray-700">{contact.country}</span>
                </div>
                
                {contact.phone && (
                  <div className="flex items-center text-sm">
                    <svg className="h-4 w-4 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-gray-700">{contact.phone}</span>
                  </div>
                )}

                {/* Notes Preview in Grid */}
                {notes[contact.$id] && (
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center text-sm font-medium text-blue-700 mb-1">
                      <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Notes
                    </div>
                    <p className="text-xs text-blue-600 line-clamp-2">{notes[contact.$id]}</p>
                  </div>
                )}

                {/* Remarks Preview in Grid */}
                {remarks[contact.$id] && (
                  <div className="mt-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="flex items-center text-sm font-medium text-orange-700 mb-1">
                      <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                      </svg>
                      Remarks
                    </div>
                    <p className="text-xs text-orange-600 line-clamp-2">{remarks[contact.$id]}</p>
                  </div>
                )}
              </div>
              
              <div className="flex justify-center gap-2 mt-6 pt-4 border-t border-gray-100">
                <button 
                  className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddNote(contact.$id);
                    setSelectedContact(contact);
                    setActiveTab('notes');
                  }}
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button 
                  className="p-2 text-orange-500 hover:bg-orange-50 rounded-lg transition-colors duration-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddRemark(contact.$id);
                    setSelectedContact(contact);
                    setActiveTab('remarks');
                  }}
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}