import { Option } from "@/components/ui/mutli-select";

export const navLinks = [
  {
    src: "/",
    title: "Home",
  },
  {
    src: "/breed",
    title: "Breeds",
  },
  {
    src: "/about",
    title: "About",
  },
  {
    src: "/donation",
    title: "Donate",
  },
  {
    src: "/contact",
    title: "Contact",
  },
];

export const dogBreeds: Option[] = [
  { value: "Labrador Retriever", label: "Labrador Retriever" },
  { value: "German Shepherd", label: "German Shepherd" },
  { value: "Golden Retriever", label: "Golden Retriever" },
  { value: "French Bulldog", label: "French Bulldog" },
  { value: "Bulldog", label: "Bulldog" },
  { value: "Poodle", label: "Poodle" },
  { value: "Beagle", label: "Beagle" },
  { value: "Rottweiler", label: "Rottweiler" },
  { value: "Yorkshire Terrier", label: "Yorkshire Terrier" },
  { value: "Boxer", label: "Boxer" },
  { value: "Dachshund", label: "Dachshund" },
  { value: "Siberian Husky", label: "Siberian Husky" },
  { value: "Great Dane", label: "Great Dane" },
  { value: "Doberman Pinscher", label: "Doberman Pinscher" },
  { value: "Australian Shepherd", label: "Australian Shepherd" },
  {
    value: "Cavalier King Charles Spaniel",
    label: "Cavalier King Charles Spaniel",
  },
  { value: "Shih Tzu", label: "Shih Tzu" },
  { value: "Pembroke Welsh Corgi", label: "Pembroke Welsh Corgi" },
  { value: "Bichon Frise", label: "Bichon Frise" },
  { value: "Boston Terrier", label: "Boston Terrier" },
];

export const EXPRESS_URL = "http://198.244.232.203:8080";
export type SocketResponseType = {
  success: string;
  error: string;
};
