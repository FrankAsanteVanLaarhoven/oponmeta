import React from "react";
import { BauhausCard } from "@/components/ui/bauhaus-card";
import { Course } from "@/types/course";

interface BauhausCourseCardProps {
  course: Course;
  onEnroll?: (courseId: number) => void;
  onBookmark?: (courseId: number) => void;
  onMoreOptions?: (courseId: number) => void;
}

const BauhausCourseCard: React.FC<BauhausCourseCardProps> = ({
  course,
  onEnroll,
  onBookmark,
  onMoreOptions,
}) => {
  // Calculate enrollment percentage based on students
  const enrollmentPercentage = Math.min((course.students / 1000) * 100, 95);
  
  // Use OponMeta brand colors
  const brandBg = "#0a1834";
  const brandBorder = "#11204a";
  const brandAccent = "#00eaff"; // cyan accent
  const brandProgressBar = "#11204a";
  const brandTextMain = "#ffffff";
  const brandTextSub = "#67e8f9";
  const brandTextTop = "#67e8f9";
  const brandTextProgressLabel = "#67e8f9";
  const brandTextProgressValue = "#00eaff";

  // Format price with discount
  const formatPrice = () => {
    if (course.originalPrice && course.originalPrice > course.price) {
      return `$${course.price}`;
    }
    return `$${course.price}`;
  };

  // Get progress text
  const getProgressText = () => {
    if (course.progress !== undefined) {
      return "Your Progress:";
    }
    return "Enrollment:";
  };

  // Get progress value
  const getProgressValue = () => {
    if (course.progress !== undefined) {
      return `${course.progress}%`;
    }
    return `${course.students.toLocaleString()} enrolled`;
  };

  // Get progress percentage
  const getProgressPercentage = () => {
    if (course.progress !== undefined) {
      return course.progress;
    }
    return enrollmentPercentage;
  };

  return (
    <BauhausCard
      id={course.id.toString()}
      accentColor={brandAccent}
      backgroundColor={brandBg}
      separatorColor={brandBorder}
      borderRadius="2em"
      borderWidth="2px"
      topInscription={formatPrice()}
      mainText={course.title}
      subMainText={`${course.instructor} • ${course.duration} • ${course.level}`}
      progressBarInscription={getProgressText()}
      progress={getProgressPercentage()}
      progressValue={getProgressValue()}
      filledButtonInscription={course.progress !== undefined ? "Resume" : "Enroll Now"}
      outlinedButtonInscription="Bookmark"
      onFilledButtonClick={(id) => onEnroll?.(parseInt(id))}
      onOutlinedButtonClick={(id) => onBookmark?.(parseInt(id))}
      onMoreOptionsClick={(id) => onMoreOptions?.(parseInt(id))}
      mirrored={false}
      swapButtons={false}
      textColorTop={brandTextTop}
      textColorMain={brandTextMain}
      textColorSub={brandTextSub}
      textColorProgressLabel={brandTextProgressLabel}
      textColorProgressValue={brandTextProgressValue}
      progressBarBackground={brandProgressBar}
      chronicleButtonBg={brandBorder}
      chronicleButtonFg={brandAccent}
      chronicleButtonHoverFg={brandTextMain}
    />
  );
};

export default BauhausCourseCard;
