import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useAppSelector } from "../redux/store/store";
import axios from "axios";
import ChatPopup from "./Chatting";

interface Conversation {
  _id: string;
  members: string[];
}

const ProfileDisplay: React.FC<{ onEdit: () => void }> = ({ onEdit }) => {
  const profile = useSelector((state: RootState) => state.profile);
  const [allConversations, setAllConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<
    string | null
  >(null);
  const { auth } = useAppSelector((state) => state.user);
  const loginUser = auth?.user;

  useEffect(() => {
    async function fetchConversations(userId: string) {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/conversation/${userId}`
        );
        setAllConversations(response.data);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    }

    if (loginUser?.userType === "business") {
      fetchConversations(loginUser.id);
    }
  }, [loginUser]);
  return (
    <div className="profile-display max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Profile Image */}
      <div className="mb-6 text-center">
        {profile?.profileImage ? (
          <img
            src={URL.createObjectURL(profile?.profileImage)}
            alt="Profile"
            className="w-32 h-32 object-cover rounded-full mx-auto border mb-4"
          />
        ) : (
          <p className="text-lg">No profile image uploaded</p>
        )}
      </div>

      {/* Profile Details */}
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-4">Profile Information</h3>
        <p>
          <strong>Services:</strong> {profile?.services}
        </p>
        <p>
          <strong>Pricing:</strong> {profile?.pricing}
        </p>
        <p>
          <strong>Availability:</strong> {profile?.availability}
        </p>
        <p>
          <strong>Location:</strong> {profile?.location}
        </p>
        <p>
          <strong>Bio:</strong> {profile?.bio}
        </p>
      </div>

      {/* Social Media Links */}
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-4">Social Media</h3>
        {profile?.socialLinks?.facebook && (
          <p>
            <strong>Facebook:</strong> {profile?.socialLinks.facebook}
          </p>
        )}
        {profile?.socialLinks?.instagram && (
          <p>
            <strong>Instagram:</strong> {profile?.socialLinks.instagram}
          </p>
        )}
        {profile?.socialLinks?.linkedin && (
          <p>
            <strong>LinkedIn:</strong> {profile?.socialLinks.linkedin}
          </p>
        )}
      </div>

      {/* Portfolio */}
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-4">Portfolio</h3>
        <div className="grid grid-cols-2 gap-4">
          {profile?.portfolioImages?.map((image, index) => (
            <img
              key={index}
              src={URL.createObjectURL(image)}
              alt={`Portfolio ${index + 1}`}
              className="w-full h-32 object-cover rounded-md"
            />
          ))}
        </div>
      </div>
      {loginUser?.userType === "business" && (
        <div className="absolute top-20 right-0">
          <h3 className="text-xl font-bold mb-4">Conversations</h3>
          <div className="space-y-2">
            {allConversations.map((conversation) => (
              <button
                key={conversation._id}
                onClick={() =>
                  setSelectedConversation(
                    conversation.members.find((id) => id !== loginUser.id) ||
                      null
                  )
                }
                className="w-full text-left p-2 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Conversation with User{" "}
                {conversation.members.find((id) => id !== loginUser.id)}
              </button>
            ))}
          </div>
        </div>
      )}

      {loginUser?.userType === "business" && selectedConversation && (
        <ChatPopup
          userId={loginUser.id}
          otherUserId={selectedConversation}
          isBusinessUser={true}
        />
      )}
      <button
        onClick={onEdit}
        className="w-full bg-gray-800 text-white p-3 rounded-md hover:bg-gray-600 transition-transform hover:scale-105"
      >
        Edit Profile
      </button>
    </div>
  );
};

export default ProfileDisplay;
