import Add from "@mui/icons-material/Add";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";

interface FileUploaderProps {
  imageUrl: string;
  handleBotImageURL: Function;
}

export default function FileUploader({
  imageUrl,
  handleBotImageURL,
}: FileUploaderProps) {
  const [botImage, setBotImage] = useState<string>(""); // Store the image URL
  const [fetchedURL, setFetchedURL] = useState(false); // To track if the image has been fetched/uploaded
  const hiddenFileInput = useRef<HTMLInputElement>(null); // Ref for the file input

  // Handle prop change and initialize image from props
  useEffect(() => {
    if (imageUrl) {
      setBotImage(imageUrl); // Set the image URL from props initially
      setFetchedURL(true); // Since we have an image from props, it's already fetched
    }
  }, [imageUrl]);

  const handleClick = (event) => {
    event.preventDefault();
    hiddenFileInput.current?.click(); // Trigger file input click
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const data = new FormData();
      data.append("file", file);

      try {
        const res = await axios.post("http://192.168.1.40:7777/botimage", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setBotImage(res.data); // Update the state with the fetched image URL
        setFetchedURL(true); // Indicate that an image was fetched
        toast.success("Sucessfully uploaded image");
        handleBotImageURL(res.data);
      } catch (error) {
        console.error("Error uploading the file:", error);
      }
    }
  };

  const display = () => {
    if (botImage) {
      return (
        <img
          src={botImage}
          alt={botImage}
          className="rounded-md object-cover size-full"
        />
      );
    } else {
      return (
        <div className="flex size-full justify-center items-center border-2 border-gray-500 rounded-lg border-dashed">
          <a
            className="flex justify-center items-center rounded-full p-2 bg-foreground-200 hover:bg-foreground-300 w-6 h-6"
            href="#"
            onClick={handleClick}
          >
            <Add />
          </a>
          <input
            type="file"
            ref={hiddenFileInput}
            style={{ display: "none" }}
            name="file"
            onChange={handleFileChange}
          />
        </div>
      );
    }
  };

  return <>{display()}</>;
}
