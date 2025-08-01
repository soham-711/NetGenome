import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Upload,
  Plus,
  Trash2,
  User,
  Music,
  Award,
  Globe,
  Calendar,
  Heart,
  Quote,
  Settings,
  Camera,
  Save,
  ArrowLeft,
  Sparkles,
  Headphones,
  Mic,
} from "lucide-react";
import profileBackground from "../assets/profile.png";

export function EditModal({ onBack }) {
  const { state } = useLocation();
  console.log(state);
  const fileInputRef = useRef(null);
  const [activeTab, setActiveTab] = useState("basic");
  const [imagePreview, setImagePreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
const navigate = useNavigate()
  const [formData, setFormData] = useState({
    displayName: "",
    priceUSD: 0,
    imageFile: null,
    vibeTags: [],
    identity: {
      realName: "",
      aliases: [],
      origin: "",
      location: "",
      languages: [],
      gender: "",
    },
    artistic_background: {
      roles: [],
      genres: [],
      influences: [],
      skills: [],
    },
    career: {
      education: "",
      collaborations: [],
      performances: [],
      awards: [],
    },
    discography: [],
    creative_process: {
      songwriting_process: "",
      production_process: "",
    },
    availability: {
      current_projects: [],
      looking_for: [],
    },
    online_presence: {
      website: "",
      social_media: [],
      streaming_platforms: [],
    },
    quotes: [],
  });

  useEffect(() => {
    if (state) {

      setFormData(state);
      if (state.imageUrl) {
        console.log(state.imageUrl);
        setImagePreview(state.imageUrl);
      }
    }
  }, [state]);

  const tabs = [
    {
      id: "basic",
      label: "Basic Info",
      icon: User,
      color: "from-blue-500/50 to-white-600/50",
    },
    {
      id: "identity",
      label: "Identity",
      icon: Heart,
      color: "from-pink-500/50 to-white-600/50",
    },
    {
      id: "artistic",
      label: "Artistic",
      icon: Music,
      color: "from-purple-500/50 to-white-600/50",
    },
    {
      id: "career",
      label: "Career",
      icon: Award,
      color: "from-yellow-500/50 to-white-600/50",
    },
    {
      id: "discography",
      label: "Discography",
      icon: Calendar,
      color: "from-green-500/50 to-white-600/50",
    },
    {
      id: "creative",
      label: "Creative",
      icon: Settings,
      color: "from-indigo-500/50 to-white-600/50",
    },
    {
      id: "availability",
      label: "Availability",
      icon: Sparkles,
      color: "from-cyan-500/50 to-white-600/50",
    },
    {
      id: "online",
      label: "Online",
      icon: Globe,
      color: "from-teal-500/50 to-white-600/50",
    },
    {
      id: "quotes",
      label: "Quotes",
      icon: Quote,
      color: "from-orange-500/50 to-white-600/50",
    },
  ];

  // Image handling functions
  const handleImageUpload = (file) => {
    if (file && file.type.startsWith("image/")) {
      if (file.size > 10 * 1024 * 1024) {
        alert("File size must be less than 10MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
      setFormData((prev) => ({ ...prev, imageFile: file }));
    } else {
      alert("Please select a valid image file");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleImageUpload(files[0]);
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    console.log(file);

    if (file) {
      handleImageUpload(file);
    }
  };

  // Form handlers
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const finalValue = type === "number" ? Number(value) : value;
    setFormData((prev) => ({ ...prev, [name]: finalValue }));
  };

  const handleNestedChange = (e, parent) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [parent]: { ...prev[parent], [name]: value },
    }));
  };

  const handleArrayChange = (e, field, index) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  const handleAddArrayItem = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const handleRemoveArrayItem = (field, index) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleNestedArrayChange = (e, parent, field, index) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: prev[parent][field].map((item, i) =>
          i === index ? value : item
        ),
      },
    }));
  };

  const handleAddNestedArrayItem = (parent, field) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: [...prev[parent][field], ""],
      },
    }));
  };

  const handleRemoveNestedArrayItem = (parent, field, index) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: prev[parent][field].filter((_, i) => i !== index),
      },
    }));
  };

  const handleDiscographyChange = (e, index, field) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      discography: prev.discography.map((item, i) =>
        i === index
          ? { ...item, [field]: field === "year" ? Number(value) : value }
          : item
      ),
    }));
  };

  const handleAddDiscographyItem = () => {
    setFormData((prev) => ({
      ...prev,
      discography: [
        ...prev.discography,
        {
          title: "",
          type: "",
          year: new Date().getFullYear(),
          label: "",
          details: "",
        },
      ],
    }));
  };

  const handleRemoveDiscographyItem = (index) => {
    setFormData((prev) => ({
      ...prev,
      discography: prev.discography.filter((_, i) => i !== index),
    }));
  };

  const handleSocialMediaChange = (e, index, field) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      online_presence: {
        ...prev.online_presence,
        social_media: prev.online_presence.social_media.map((item, i) =>
          i === index ? { ...item, [field]: value } : item
        ),
      },
    }));
  };

  const handleAddSocialMediaItem = () => {
    setFormData((prev) => ({
      ...prev,
      online_presence: {
        ...prev.online_presence,
        social_media: [
          ...prev.online_presence.social_media,
          { platform: "", url: "" },
        ],
      },
    }));
  };

  const handleRemoveSocialMediaItem = (index) => {
    setFormData((prev) => ({
      ...prev,
      online_presence: {
        ...prev.online_presence,
        social_media: prev.online_presence.social_media.filter(
          (_, i) => i !== index
        ),
      },
    }));
  };

  const handleStreamingPlatformChange = (e, index, field) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      online_presence: {
        ...prev.online_presence,
        streaming_platforms: prev.online_presence.streaming_platforms.map(
          (item, i) => (i === index ? { ...item, [field]: value } : item)
        ),
      },
    }));
  };

  const handleAddStreamingPlatformItem = () => {
    setFormData((prev) => ({
      ...prev,
      online_presence: {
        ...prev.online_presence,
        streaming_platforms: [
          ...prev.online_presence.streaming_platforms,
          { platform: "", url: "" },
        ],
      },
    }));
  };

  const handleRemoveStreamingPlatformItem = (index) => {
    setFormData((prev) => ({
      ...prev,
      online_presence: {
        ...prev.online_presence,
        streaming_platforms: prev.online_presence.streaming_platforms.filter(
          (_, i) => i !== index
        ),
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let imageUrl = formData.imageUrl;

      // Step 1: Upload new image if selected
      if (formData.imageFile) {
        const imageForm = new FormData();
        imageForm.append("image", formData.imageFile);

        const imageUploadRes = await fetch(
          "http://localhost:5000/api/upload-image",
          {
            method: "POST",
            body: imageForm,
          }
        );

        const imageData = await imageUploadRes.json();

        if (imageUploadRes.ok && imageData.imageUrl) {
          imageUrl = imageData.imageUrl; // ✅ Use the returned full URL
        } else {
          throw new Error("Image upload failed");
        }
      }

      // Step 2: Strip system/internal fields
      const { _id, _creationTime, imageFile, artistID, ...validUpdates } =
        formData;

      // Step 3: Add updated imageUrl
      validUpdates.imageUrl = imageUrl;

      // Step 4: Send to update endpoint
      const res = await fetch("http://localhost:5000/api/artists/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          artistID,
          updates: validUpdates,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Update failed");

      alert("✅ Changes saved successfully!");
      if (onBack) onBack();
    } catch (error) {
      console.error("Error saving changes:", error);
      alert("❌ Failed to save changes");
    } finally {
      setIsLoading(false);
      navigate("/artist/dashboard");
    }
  };

  // Helper function to render array inputs with enhanced curves
  const renderArrayInput = (items, field, placeholder, parent = null) => (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-3 group">
          <input
            type="text"
            value={item}
            onChange={(e) =>
              parent
                ? handleNestedArrayChange(e, parent, field, index)
                : handleArrayChange(e, field, index)
            }
            className="flex-1 px-4 py-3 border border-white/20 rounded-3xl focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-200 bg-white/10 backdrop-blur-md shadow-lg hover:shadow-xl text-white placeholder-white/60"
            placeholder={placeholder}
          />
          <button
            type="button"
            onClick={() =>
              parent
                ? handleRemoveNestedArrayItem(parent, field, index)
                : handleRemoveArrayItem(field, index)
            }
            className="p-3 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100 backdrop-blur-md"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          parent
            ? handleAddNestedArrayItem(parent, field)
            : handleAddArrayItem(field)
        }
        className="flex items-center gap-2 px-4 py-3 text-white/80 hover:text-white hover:bg-white/20 rounded-3xl transition-all duration-200 border-2 border-dashed border-white/30 hover:border-white/50 w-full justify-center backdrop-blur-md"
      >
        <Plus size={18} />
        Add {placeholder.replace("Enter ", "").replace("...", "")}
      </button>
    </div>
  );

  const renderImageUpload = () => (
    <div className="space-y-4">
      <label className="block text-lg font-bold text-white mb-3 drop-shadow-lg">
        Artist Photo
      </label>

      <div
        className={`relative border-2 border-dashed rounded-3xl p-8 text-center transition-all duration-300 backdrop-blur-md bg-white/10 shadow-2xl ${
          isDragging
            ? "border-white/50 bg-white/20 scale-105 shadow-3xl"
            : "border-white/30 hover:border-white/50 hover:bg-white/15"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {imagePreview ? (
          <div className="relative inline-block">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-40 h-40 object-cover rounded-3xl mx-auto mb-4 shadow-2xl ring-4 ring-white/20"
            />
            <button
              type="button"
              onClick={() => {
                setImagePreview(null);
                setFormData((prev) => ({ ...prev, imageFile: null }));
              }}
              className="absolute -top-2 -right-2 bg-red-500/80 backdrop-blur-md text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600/80 transition-all duration-200 shadow-lg hover:scale-110"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ) : (
          <div className="py-12">
            <div className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-md p-4 rounded-full w-20 h-20 mx-auto mb-6 shadow-lg border border-white/20">
              <Camera className="h-12 w-12 text-white" />
            </div>
            <p className="text-lg font-medium text-white mb-2 drop-shadow-lg">
              Drag and drop your photo here
            </p>
            <p className="text-sm text-white/70 drop-shadow-md">
              or click to browse • PNG, JPG, GIF up to 10MB
            </p>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>

      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="w-full flex items-center justify-center px-6 py-3 border border-white/30 rounded-3xl shadow-lg text-sm font-semibold text-white bg-white/10 backdrop-blur-md hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-200 hover:shadow-xl"
      >
        <Upload className="mr-2 h-5 w-5" />
        Choose Image
      </button>
    </div>
  );

  const renderBasicInfo = () => (
    <div className="space-y-8">
      {renderImageUpload()}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label className="block text-sm font-bold text-white drop-shadow-lg">
            Display Name *
          </label>
          <input
            type="text"
            name="displayName"
            value={formData.displayName}
            onChange={handleChange}
            required
            className="w-full px-4 py-4 border border-white/20 rounded-3xl focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-200 bg-white/10 backdrop-blur-md shadow-lg hover:shadow-xl text-lg text-white placeholder-white/60"
            placeholder="Enter your stage name"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-bold text-white drop-shadow-lg">
            Price (USD)
          </label>
          <input
            type="number"
            name="priceUSD"
            value={formData.priceUSD}
            onChange={handleChange}
            min="0"
            step="0.01"
            className="w-full px-4 py-4 border border-white/20 rounded-3xl focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-200 bg-white/10 backdrop-blur-md shadow-lg hover:shadow-xl text-lg text-white placeholder-white/60"
            placeholder="0.00"
          />
        </div>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-bold text-white drop-shadow-lg">
          Vibe Tags
        </label>
        {renderArrayInput(
          formData.vibeTags || [],
          "vibeTags",
          "Enter vibe tag"
        )}
      </div>
    </div>
  );

  const renderIdentity = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-bold text-white drop-shadow-lg">
            Real Name
          </label>
          <input
            type="text"
            name="realName"
            value={formData.identity.realName}
            onChange={(e) => handleNestedChange(e, "identity")}
            className="w-full px-4 py-4 border border-white/20 rounded-3xl focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-200 bg-white/10 backdrop-blur-md shadow-lg hover:shadow-xl text-white placeholder-white/60"
            placeholder="Enter your real name"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-bold text-white drop-shadow-lg">
            Origin
          </label>
          <input
            type="text"
            name="origin"
            value={formData.identity.origin}
            onChange={(e) => handleNestedChange(e, "identity")}
            className="w-full px-4 py-4 border border-white/20 rounded-3xl focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-200 bg-white/10 backdrop-blur-md shadow-lg hover:shadow-xl text-white placeholder-white/60"
            placeholder="Where are you from?"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-bold text-white drop-shadow-lg">
            Current Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.identity.location}
            onChange={(e) => handleNestedChange(e, "identity")}
            className="w-full px-4 py-4 border border-white/20 rounded-3xl focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-200 bg-white/10 backdrop-blur-md shadow-lg hover:shadow-xl text-white placeholder-white/60"
            placeholder="Where do you live now?"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-bold text-white drop-shadow-lg">
            Gender
          </label>
          <select
            name="gender"
            value={formData.identity.gender || ""}
            onChange={(e) => handleNestedChange(e, "identity")}
            className="w-full px-4 py-4 border border-white/20 rounded-3xl focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-200 bg-white/10 backdrop-blur-md shadow-lg hover:shadow-xl text-white"
          >
            <option value="" className="bg-gray-800 text-white">
              Select gender
            </option>
            <option value="male" className="bg-gray-800 text-white">
              Male
            </option>
            <option value="female" className="bg-gray-800 text-white">
              Female
            </option>
            <option value="non-binary" className="bg-gray-800 text-white">
              Non-binary
            </option>
            <option
              value="prefer-not-to-say"
              className="bg-gray-800 text-white"
            >
              Prefer not to say
            </option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-bold text-white drop-shadow-lg">
          Aliases
        </label>
        {renderArrayInput(
          formData.identity.aliases,
          "aliases",
          "Enter alias",
          "identity"
        )}
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-bold text-white drop-shadow-lg">
          Languages
        </label>
        {renderArrayInput(
          formData.identity.languages,
          "languages",
          "Enter language",
          "identity"
        )}
      </div>
    </div>
  );

  const renderArtistic = () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <label className="block text-sm font-bold text-white drop-shadow-lg">
          Roles
        </label>
        {renderArrayInput(
          formData.artistic_background.roles,
          "roles",
          "Enter role (e.g., Vocalist, Producer, Songwriter)",
          "artistic_background"
        )}
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-bold text-white drop-shadow-lg">
          Genres
        </label>
        {renderArrayInput(
          formData.artistic_background.genres,
          "genres",
          "Enter genre (e.g., Pop, Hip-Hop, R&B)",
          "artistic_background"
        )}
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-bold text-white drop-shadow-lg">
          Influences
        </label>
        {renderArrayInput(
          formData.artistic_background.influences,
          "influences",
          "Enter artist or style that influences you",
          "artistic_background"
        )}
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-bold text-white drop-shadow-lg">
          Skills
        </label>
        {renderArrayInput(
          formData.artistic_background.skills,
          "skills",
          "Enter skill (e.g., Mixing, Guitar, Piano)",
          "artistic_background"
        )}
      </div>
    </div>
  );

  const renderCareer = () => (
    <div className="space-y-8">
      <div className="space-y-2">
        <label className="block text-sm font-bold text-white drop-shadow-lg">
          Education
        </label>
        <textarea
          name="education"
          value={formData.career.education}
          onChange={(e) => handleNestedChange(e, "career")}
          className="w-full px-4 py-4 border border-white/20 rounded-3xl focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-200 bg-white/10 backdrop-blur-md shadow-lg hover:shadow-xl text-white placeholder-white/60"
          rows={4}
          placeholder="Describe your educational background in music or related fields..."
        />
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-bold text-white drop-shadow-lg">
          Collaborations
        </label>
        {renderArrayInput(
          formData.career.collaborations,
          "collaborations",
          "Enter collaboration details",
          "career"
        )}
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-bold text-white drop-shadow-lg">
          Performances
        </label>
        {renderArrayInput(
          formData.career.performances,
          "performances",
          "Enter performance or venue",
          "career"
        )}
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-bold text-white drop-shadow-lg">
          Awards & Recognition
        </label>
        {renderArrayInput(
          formData.career.awards,
          "awards",
          "Enter award or recognition",
          "career"
        )}
      </div>
    </div>
  );

  const renderDiscography = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white/10 backdrop-blur-md p-4 rounded-3xl shadow-lg">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2 drop-shadow-lg">
          <Music className="h-6 w-6 text-green-400" />
          Discography
        </h3>
        <button
          type="button"
          onClick={handleAddDiscographyItem}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500/80 to-white-600/80 backdrop-blur-md text-white rounded-3xl hover:from-white-700/50 hover:to-green-500/50 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <Plus size={18} />
          Add Release
        </button>
      </div>

      <div className="space-y-6">
        {formData.discography.map((item, index) => (
          <div
            key={index}
            className="border border-white/20 rounded-3xl p-6 bg-white/10 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-white drop-shadow-lg">
                  Title *
                </label>
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => handleDiscographyChange(e, index, "title")}
                  className="w-full px-4 py-3 border border-white/20 rounded-3xl focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-200 bg-white/10 backdrop-blur-md text-white placeholder-white/60"
                  placeholder="Enter release title"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-white drop-shadow-lg">
                  Type *
                </label>
                <select
                  value={item.type}
                  onChange={(e) => handleDiscographyChange(e, index, "type")}
                  className="w-full px-4 py-3 border border-white/20 rounded-3xl focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-200 bg-white/10 backdrop-blur-md text-white"
                >
                  <option value="" className="bg-gray-800 text-white">
                    Select type
                  </option>
                  <option value="album" className="bg-gray-800 text-white">
                    Album
                  </option>
                  <option value="ep" className="bg-gray-800 text-white">
                    EP
                  </option>
                  <option value="single" className="bg-gray-800 text-white">
                    Single
                  </option>
                  <option value="mixtape" className="bg-gray-800 text-white">
                    Mixtape
                  </option>
                  <option
                    value="compilation"
                    className="bg-gray-800 text-white"
                  >
                    Compilation
                  </option>
                  <option value="live" className="bg-gray-800 text-white">
                    Live Recording
                  </option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-white drop-shadow-lg">
                  Year
                </label>
                <input
                  type="number"
                  value={item.year}
                  onChange={(e) => handleDiscographyChange(e, index, "year")}
                  className="w-full px-4 py-3 border border-white/20 rounded-3xl focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-200 bg-white/10 backdrop-blur-md text-white placeholder-white/60"
                  min="1900"
                  max={new Date().getFullYear() + 5}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-white drop-shadow-lg">
                  Label
                </label>
                <input
                  type="text"
                  value={item.label}
                  onChange={(e) => handleDiscographyChange(e, index, "label")}
                  className="w-full px-4 py-3 border border-white/20 rounded-3xl focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-200 bg-white/10 backdrop-blur-md text-white placeholder-white/60"
                  placeholder="Enter record label"
                />
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <label className="block text-sm font-semibold text-white drop-shadow-lg">
                Details & Description
              </label>
              <textarea
                value={item.details}
                onChange={(e) => handleDiscographyChange(e, index, "details")}
                className="w-full px-4 py-3 border border-white/20 rounded-3xl focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-200 bg-white/10 backdrop-blur-md text-white placeholder-white/60"
                rows={4}
                placeholder="Describe the release, its themes, production details, or any other relevant information..."
              />
            </div>
            <button
              type="button"
              onClick={() => handleRemoveDiscographyItem(index)}
              className="flex items-center gap-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 px-4 py-2 rounded-3xl transition-all duration-200 backdrop-blur-md"
            >
              <Trash2 size={16} />
              Remove Release
            </button>
          </div>
        ))}

        {formData.discography.length === 0 && (
          <div className="text-center py-16 text-white/70 bg-white/10 backdrop-blur-md rounded-3xl shadow-lg">
            <div className="bg-gradient-to-br from-green-400/20 to-green-600/20 p-6 rounded-full w-24 h-24 mx-auto mb-6 backdrop-blur-md border border-green-400/20">
              <Music className="h-12 w-12 text-green-400 mx-auto" />
            </div>
            <p className="text-xl font-medium mb-2 text-white drop-shadow-lg">
              No releases added yet
            </p>
            <p className="text-sm text-white/70">
              Start building your discography by adding your first release
            </p>
          </div>
        )}
      </div>
    </div>
  );

  const renderCreative = () => (
    <div className="space-y-8">
      <div className="space-y-2">
        <label className=" text-sm font-bold text-white flex items-center gap-2 drop-shadow-lg">
          <Mic className="h-5 w-5 text-indigo-400" />
          Songwriting Process
        </label>
        <textarea
          name="songwriting_process"
          value={formData.creative_process.songwriting_process}
          onChange={(e) => handleNestedChange(e, "creative_process")}
          className="w-full px-4 py-4 border border-white/20 rounded-3xl focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-200 bg-white/10 backdrop-blur-md shadow-lg hover:shadow-xl text-white placeholder-white/60"
          rows={5}
          placeholder="Describe your songwriting process... How do you approach writing lyrics and melodies? What inspires your songs? Do you write alone or collaborate?"
        />
      </div>
      <div className="space-y-2">
        <label className=" text-sm font-bold text-white flex items-center gap-2 drop-shadow-lg">
          <Headphones className="h-5 w-5 text-indigo-400" />
          Production Process
        </label>
        <textarea
          name="production_process"
          value={formData.creative_process.production_process}
          onChange={(e) => handleNestedChange(e, "creative_process")}
          className="w-full px-4 py-4 border border-white/20 rounded-3xl focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-200 bg-white/10 backdrop-blur-md shadow-lg hover:shadow-xl text-white placeholder-white/60"
          rows={5}
          placeholder="Describe your production process... What DAW do you use? Do you produce your own tracks? What's your recording setup like?"
        />
      </div>
    </div>
  );

  const renderAvailability = () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <label className=" text-sm font-bold text-white flex items-center gap-2 drop-shadow-lg">
          <Calendar className="h-5 w-5 text-cyan-400" />
          Current Projects
        </label>
        {renderArrayInput(
          formData.availability.current_projects,
          "current_projects",
          "Enter current project or work",
          "availability"
        )}
      </div>

      <div className="space-y-4">
        <label className=" text-sm font-bold text-white flex items-center gap-2 drop-shadow-lg">
          <Sparkles className="h-5 w-5 text-cyan-400" />
          Looking For
        </label>
        {renderArrayInput(
          formData.availability.looking_for,
          "looking_for",
          "Enter what collaboration or opportunity you seek",
          "availability"
        )}
      </div>
    </div>
  );

  const renderOnline = () => (
    <div className="space-y-8">
      <div className="space-y-2">
        <label className="block text-sm font-bold text-white drop-shadow-lg">
          Website
        </label>
        <input
          type="url"
          name="website"
          value={formData.online_presence.website}
          onChange={(e) => handleNestedChange(e, "online_presence")}
          className="w-full px-4 py-4 border border-white/20 rounded-3xl focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-200 bg-white/10 backdrop-blur-md shadow-lg hover:shadow-xl text-white placeholder-white/60"
          placeholder="https://yourwebsite.com"
        />
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between bg-white/10 backdrop-blur-md p-4 rounded-3xl shadow-lg">
          <h3 className="text-lg font-semibold text-white drop-shadow-lg">
            Social Media Platforms
          </h3>
          <button
            type="button"
            onClick={handleAddSocialMediaItem}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500/80 to-white-600/80 backdrop-blur-md text-white rounded-3xl hover:from-white-600/80 hover:to-teal-500/50 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Plus size={16} />
            Add Platform
          </button>
        </div>

        <div className="space-y-4">
          {formData.online_presence.social_media.map((item, index) => (
            <div
              key={index}
              className="border border-white/20 rounded-3xl p-6 bg-white/10 backdrop-blur-md hover:bg-white/15 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-white drop-shadow-lg">
                    Platform
                  </label>
                  <input
                    type="text"
                    value={item.platform}
                    onChange={(e) =>
                      handleSocialMediaChange(e, index, "platform")
                    }
                    className="w-full px-4 py-3 border border-white/20 rounded-3xl focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-200 bg-white/10 backdrop-blur-md text-white placeholder-white/60"
                    placeholder="e.g., Instagram, Twitter, TikTok, Facebook"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-white drop-shadow-lg">
                    Profile URL
                  </label>
                  <input
                    type="url"
                    value={item.url}
                    onChange={(e) => handleSocialMediaChange(e, index, "url")}
                    className="w-full px-4 py-3 border border-white/20 rounded-3xl focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-200 bg-white/10 backdrop-blur-md text-white placeholder-white/60"
                    placeholder="https://..."
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveSocialMediaItem(index)}
                className="flex items-center gap-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 px-3 py-2 rounded-3xl transition-all duration-200 backdrop-blur-md"
              >
                <Trash2 size={16} />
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between bg-white/10 backdrop-blur-md p-4 rounded-3xl shadow-lg">
          <h3 className="text-lg font-semibold text-white drop-shadow-lg">
            Streaming Platforms
          </h3>
          <button
            type="button"
            onClick={handleAddStreamingPlatformItem}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500/80 to-teal-600/80 backdrop-blur-md text-white rounded-3xl hover:from-teal-600/80 hover:to-teal-700/80 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Plus size={16} />
            Add Platform
          </button>
        </div>

        <div className="space-y-4">
          {formData.online_presence.streaming_platforms.map((item, index) => (
            <div
              key={index}
              className="border border-white/20 rounded-3xl p-6 bg-white/10 backdrop-blur-md hover:bg-white/15 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-white drop-shadow-lg">
                    Platform
                  </label>
                  <input
                    type="text"
                    value={item.platform}
                    onChange={(e) =>
                      handleStreamingPlatformChange(e, index, "platform")
                    }
                    className="w-full px-4 py-3 border border-white/20 rounded-3xl focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-200 bg-white/10 backdrop-blur-md text-white placeholder-white/60"
                    placeholder="e.g., Spotify, Apple Music, SoundCloud, YouTube Music"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-white drop-shadow-lg">
                    Artist Profile URL
                  </label>
                  <input
                    type="url"
                    value={item.url}
                    onChange={(e) =>
                      handleStreamingPlatformChange(e, index, "url")
                    }
                    className="w-full px-4 py-3 border border-white/20 rounded-3xl focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-200 bg-white/10 backdrop-blur-md text-white placeholder-white/60"
                    placeholder="https://..."
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveStreamingPlatformItem(index)}
                className="flex items-center gap-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 px-3 py-2 rounded-3xl transition-all duration-200 backdrop-blur-md"
              >
                <Trash2 size={16} />
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderQuotes = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <label className=" text-sm font-bold text-white flex items-center gap-2 drop-shadow-lg">
          <Quote className="h-5 w-5 text-orange-400" />
          Inspirational Quotes & Philosophy
        </label>
        <div className="space-y-4">
          {formData.quotes.map((quote, index) => (
            <div key={index} className="flex items-start gap-3 group">
              <div className="flex-1 space-y-2">
                <textarea
                  value={quote}
                  onChange={(e) => handleArrayChange(e, "quotes", index)}
                  className="w-full px-4 py-4 border border-white/20 rounded-3xl focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-200 bg-white/10 backdrop-blur-md shadow-lg hover:shadow-xl text-white placeholder-white/60"
                  rows={3}
                  placeholder="Enter an inspirational quote, personal motto, or philosophy that drives your music..."
                />
              </div>
              <button
                type="button"
                onClick={() => handleRemoveArrayItem("quotes", index)}
                className="p-3 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100 mt-1 backdrop-blur-md"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddArrayItem("quotes")}
            className="flex items-center gap-2 px-4 py-3 text-orange-400 hover:text-orange-300 hover:bg-orange-500/20 rounded-3xl transition-all duration-200 border-2 border-dashed border-orange-400/30 hover:border-orange-400/50 w-full justify-center backdrop-blur-md"
          >
            <Plus size={18} />
            Add Quote
          </button>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "basic":
        return renderBasicInfo();
      case "identity":
        return renderIdentity();
      case "artistic":
        return renderArtistic();
      case "career":
        return renderCareer();
      case "discography":
        return renderDiscography();
      case "creative":
        return renderCreative();
      case "availability":
        return renderAvailability();
      case "online":
        return renderOnline();
      case "quotes":
        return renderQuotes();
      default:
        return (
          <div className="text-center py-20 text-white/70">
            Content for {activeTab} tab
          </div>
        );
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${profileBackground})` }}
    >
      <div className="min-h-screen bg-black/40 backdrop-blur-[2px]">
        <div className="max-w-7xl mx-auto">
          {/* Header with curved design */}
          <div className="bg-white/10 backdrop-blur-xl shadow-2xl border-b border-white/20 sticky top-0 z-10 rounded-b-3xl">
            <div className="px-8 py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {onBack && (
                    <button
                      onClick={onBack}
                      className="p-3 hover:bg-white/20 rounded-full transition-colors backdrop-blur-md"
                    >
                      <ArrowLeft size={24} className="text-white" />
                    </button>
                  )}
                  <div className="bg-white/10 backdrop-blur-md rounded-3xl p-4 border border-white/20 shadow-lg">
                    <h1 className="text-2xl font-bold text-white drop-shadow-2xl">
                      Edit Artist Profile
                    </h1>
                    <p className="text-white/80 text-sm mt-1 drop-shadow-lg">
                      Update your artist information and showcase your talent
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-xs text-white/80 bg-white/10 backdrop-blur-md px-3 py-2 rounded-full border border-white/20 shadow-lg">
                    {formData.displayName
                      ? `Editing: ${formData.displayName}`
                      : "New Artist Profile"}
                  </div>
                  <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className={`px-6 py-3 bg-gradient-to-r from-white-10/80 to-purple-600/50 backdrop-blur-md text-white rounded-3xl font-semibold hover:from-purple-600/50 hover:to-white-10/50 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-200 flex items-center gap-3 shadow-xl hover:shadow-2xl border border-white/20 text-sm ${
                      isLoading
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:scale-105"
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save size={16} />
                        Save
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex">
            {/* Sidebar - Made smaller and more curved */}
            <div className="w-64 bg-white/10 backdrop-blur-xl shadow-2xl border-r border-white/20 min-h-[calc(100vh-120px)] overflow-y-auto rounded-r-3xl">
              <div className="p-4 space-y-1">
                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-3 mb-4 border border-white/20 shadow-lg">
                  <h3 className="text-sm font-bold text-white drop-shadow-lg text-center">
                    Profile Sections
                  </h3>
                </div>
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition-all duration-200 group ${
                        activeTab === tab.id
                          ? `bg-gradient-to-r ${tab.color} text-white shadow-xl transform scale-105 backdrop-blur-md border border-white/20`
                          : "text-white/80 hover:bg-white/20 hover:shadow-lg backdrop-blur-md border border-white/10 hover:border-white/20"
                      }`}
                    >
                      <div
                        className={`p-2 rounded-xl backdrop-blur-md ${
                          activeTab === tab.id
                            ? "bg-white/20"
                            : "bg-white/10 group-hover:bg-white/20"
                        }`}
                      >
                        <Icon
                          size={16}
                          className={
                            activeTab === tab.id
                              ? "text-white"
                              : "text-white/80"
                          }
                        />
                      </div>
                      <span className="font-semibold text-xs">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Content with curved design */}
            <div className="flex-1 min-h-[calc(100vh-120px)] overflow-y-auto">
              <div className="p-6">
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6">
                  <div className="mb-6">
                    <div className="bg-white/10 backdrop-blur-md rounded-3xl p-4 border border-white/20 shadow-lg">
                      <h2 className="text-xl font-bold text-white mb-2 drop-shadow-lg">
                        {tabs.find((tab) => tab.id === activeTab)?.label}
                      </h2>
                      <div className="h-1 w-16 bg-gradient-to-r from-white/50 to-white/30 rounded-full"></div>
                    </div>
                  </div>
                  {renderTabContent()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
