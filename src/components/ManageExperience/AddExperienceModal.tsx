import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../Loading/Loading";
import { useAddExperienceMutation } from "@/redux/features/experience/experienceApi";

const AddExperienceModal = () => {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [employmentType, setEmploymentType] = useState("Full-time");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("Present");
  const [duration, setDuration] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const [addExperience, { isLoading }] = useAddExperienceMutation();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (
      !title.trim() ||
      !company.trim() ||
      !startDate.trim() ||
      !duration.trim() ||
      !location.trim() ||
      !description.trim()
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const experienceData = {
      title,
      company,
      employmentType,
      startDate,
      endDate,
      duration,
      location,
      description,
    };

    try {
      await addExperience(experienceData).unwrap();

      // Reset form after successful submission
      setTitle("");
      setCompany("");
      setEmploymentType("Full-time");
      setStartDate("");
      setEndDate("Present");
      setDuration("");
      setLocation("");
      setDescription("");
      toast.success("Experience added successfully!");
    } catch (error) {
      toast.error("Error adding experience. Please try again.");
      console.error("Error adding experience:", error);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div>
      <Toaster />
      <Dialog>
        <DialogTrigger asChild>
          <button className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-500 transition-colors duration-300">
            Add Experience
          </button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Experience</DialogTitle>
            <DialogDescription>Add a new experience entry</DialogDescription>
          </DialogHeader>
          <form onSubmit={onSubmit}>
            <div className="grid gap-4 py-4">
              {/* Title Field */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  id="title"
                  className="col-span-3"
                />
              </div>

              {/* Company Field */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="company" className="text-right">
                  Company
                </Label>
                <Input
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  id="company"
                  className="col-span-3"
                />
              </div>

              {/* Employment Type Field */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="employmentType" className="text-right">
                  Employment Type
                </Label>
                <select
                  value={employmentType}
                  onChange={(e) => setEmploymentType(e.target.value)}
                  id="employmentType"
                  className="col-span-3 border rounded p-2"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              {/* Start Date Field */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="startDate" className="text-right">
                  Start Date
                </Label>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  id="startDate"
                  className="col-span-3"
                />
              </div>

              {/* End Date Field */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="endDate" className="text-right">
                  End Date
                </Label>
                <Input
                  type="text"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  id="endDate"
                  className="col-span-3"
                  placeholder="Present"
                />
              </div>

              {/* Duration Field */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="duration" className="text-right">
                  Duration
                </Label>
                <Input
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  id="duration"
                  className="col-span-3"
                />
              </div>

              {/* Location Field */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location" className="text-right">
                  Location
                </Label>
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  id="location"
                  className="col-span-3"
                />
              </div>

              {/* Description Field */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  id="description"
                  className="col-span-3"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <DialogClose asChild>
                <button
                  className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-500 transition-colors duration-300"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Save"}
                </button>
              </DialogClose>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddExperienceModal;
