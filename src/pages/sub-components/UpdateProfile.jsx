import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  clearAllUserErrors,
  getUser,
  resetProfile,
  updateProfile,
} from "@/store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Textarea } from "@/components/ui/textarea";
import SpecialLoadingButton from "./SpecialLoadingButton";
import resumeImage from "../../assets/resumeImage.svg";

const UpdateProfile = () => {
  const { user, loading, error, isUpdated, message } = useSelector(
    (state) => state.user
  );

  const [fullName, setFullName] = useState(user && user.fullName);
  const [email, setEmail] = useState(user && user.email);
  const [phone, setPhone] = useState(user && user.phone);
  const [aboutMe, setAboutMe] = useState(user && user.aboutMe);
  const [portfolioURL, setPortfolioURL] = useState(user && user.portfolioURL);
  const [linkedInURL, setLinkedInURL] = useState(
    user && (user.linkedInURL === "undefined" ? "" : user.linkedInURL)
  );
  const [githubURL, setGithubURL] = useState(
    user && (user.githubURL === "undefined" ? "" : user.githubURL)
  );
  const [instagramURL, setInstagramURL] = useState(
    user && (user.instagramURL === "undefined" ? "" : user.instagramURL)
  );
  const [twitterURL, setTwitterURL] = useState(
    user && (user.twitterURL === "undefined" ? "" : user.twitterURL)
  );
  const [facebookURL, setFacebookURL] = useState(
    user && (user.facebookURL === "undefined" ? "" : user.facebookURL)
  );
  const [avatar, setAvatar] = useState(user && user.avatar && user.avatar.url);
  const [avatarPreview, setAvatarPreview] = useState(
    user && user.avatar && user.avatar.url
  );
  const [resume, setResume] = useState(user && user.resume);
  const [resumePreview, setResumePreview] = useState(
    user && (user.resume === "undefined" ? "" : user.resume)
  );

  const dispatch = useDispatch();

  const avatarHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setAvatarPreview(reader.result);
      setAvatar(file);
    };
  };

  const handleUpdateProfile = () => {
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("aboutMe", aboutMe);
    formData.append("portfolioURL", portfolioURL);
    formData.append("linkedInURL", linkedInURL);
    formData.append("githubURL", githubURL);
    formData.append("instagramURL", instagramURL);
    formData.append("twitterURL", twitterURL);
    formData.append("facebookURL", facebookURL);
    formData.append("resume", resume);
    formData.append("avatar", avatar);
    dispatch(updateProfile(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (isUpdated) {
      dispatch(getUser());
      dispatch(resetProfile());
    }
    if (message) {
      toast.success(message);
    }
  }, [dispatch, loading, error, isUpdated]);

  return (
    <>
      <div className="w-full h-full">
        <div>
          <div className="grid w-[100%] gap-6">
            <div className="grid gap-2">
              <h1 className="text-3xl font-bold">Update Profile</h1>
              <p className="text-balance text-muted-foreground">
                Update Your Profile Here
              </p>
            </div>
            <div className="grid gap-4">
              <div className="flex items-start lg:justify-around lg:items-center flex-col lg:flex-row gap-5">
                <div className="grid gap-2 w-full sm:w-72">
                  <Label>Profile Image</Label>
                  <img
                    src={avatarPreview ? avatarPreview : "/avatarHolder.jpg"}
                    alt="avatar"
                    className="w-full h-auto sm:w-72 sm:h-72 rounded-2xl"
                  />
                  <div className="relative">
                    <input
                      type="file"
                      onChange={avatarHandler}
                      className="avatar-update-btn"
                    />
                  </div>
                </div>
                <div className="grid gap-2 w-full sm:w-72">
                  <Label>Resume</Label>
                  <a to={user?.resume} target="_blank">
                    <img
                      src={resumeImage}
                      alt="avatar"
                      className="w-full  h-auto sm:w-72 sm:h-72 rounded-2xl"
                    />
                  </a>
                  <div className="relative">
                    <Input
                      placeholder="Enter resume URL here"
                      type="text"
                      className="Your Resume Link"
                      value={resume}
                      onChange={(e) => setResume(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Full Name</Label>
                <Input
                  type="text"
                  className="Your Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  className="Your Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Phone</Label>
                <Input
                  type="text"
                  className="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>About Me</Label>
                <Textarea
                  className="About Me"
                  value={aboutMe}
                  onChange={(e) => setAboutMe(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Portfolio URL</Label>
                <Input
                  type="text"
                  className="Portfolio URL"
                  value={portfolioURL}
                  onChange={(e) => setPortfolioURL(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label>LinkedIn URL</Label>
                <Input
                  type="text"
                  className="LinkedIn URL"
                  value={linkedInURL}
                  onChange={(e) => setLinkedInURL(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Github URL</Label>
                <Input
                  type="text"
                  className="Github URL"
                  value={githubURL}
                  onChange={(e) => setGithubURL(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Instagram URL</Label>
                <Input
                  type="text"
                  className="Instagram URL"
                  value={instagramURL}
                  onChange={(e) => setInstagramURL(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Twitter(X) URL</Label>
                <Input
                  type="text"
                  className="Twitter(X) URL"
                  value={twitterURL}
                  onChange={(e) => setTwitterURL(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Facebook URL</Label>
                <Input
                  type="text"
                  className="Facebook URL"
                  value={facebookURL}
                  onChange={(e) => setFacebookURL(e.target.value)}
                />
              </div>
              {!loading ? (
                <Button
                  onClick={() => handleUpdateProfile()}
                  className="w-full"
                >
                  Update Profile
                </Button>
              ) : (
                <SpecialLoadingButton content={"Updating"} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;
