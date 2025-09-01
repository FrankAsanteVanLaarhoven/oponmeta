import { useState, useMemo } from "react";
import { Course } from "@/data/coursesData";

export const useCourseFilters = (courses: Course[]) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [difficulty, setDifficulty] = useState("All");
  const [duration, setDuration] = useState("All");

  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           course.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
      const matchesPrice = course.price >= priceRange[0] && course.price <= priceRange[1];
      const matchesDifficulty = difficulty === "All" || course.level === difficulty;
      const matchesDuration = duration === "All" || course.duration === duration;
      
      return matchesSearch && matchesCategory && matchesPrice && matchesDifficulty && matchesDuration;
    });
  }, [courses, searchTerm, selectedCategory, priceRange, difficulty, duration]);

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setPriceRange([0, 1000]);
    setDifficulty("All");
    setDuration("All");
  };

  return {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
    difficulty,
    setDifficulty,
    duration,
    setDuration,
    filteredCourses,
    resetFilters
  };
};