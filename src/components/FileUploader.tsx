import Add from "@mui/icons-material/Add";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@nextui-org/react";
import Fullscreen from "@mui/icons-material/Fullscreen";


interface FileUploaderProps {
  imageUrl: string;
  handleBotImageURL: Function;
}

export default function FileUploader({
  imageUrl,
  handleBotImageURL,
}: FileUploaderProps) {
  const [botImage, setBotImage] = useState<string>("");
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (imageUrl) {
      setBotImage(imageUrl);
    }
  }, [imageUrl]);

  const handleClick = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    hiddenFileInput.current?.click();
  };

  const handleFileChange = async (file: File | null) => {
    if (file) {
      const data = new FormData();
      data.append("file", file);

      try {
        const res = await axios.post(
          "http://192.168.1.40:7777/botimage",
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setBotImage(res.data);
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
        <div className="relative size-full">
          <img
            src={botImage}
            alt={botImage}
            className="object-cover rounded-md"
          />
          <div className="absolute bottom-0 left-0 w-full px-1 pb-1 flex gap-1">
            <Button color="default" className="backdrop-blur p-1 grow">
              Swap
            </Button>
            <Button isIconOnly color="default" className="backdrop-blur p-1">
            <Fullscreen/>
            </Button>
          </div>
        </div>
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
            onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
          />
        </div>
      );
    }
  };

  return <>{display()}</>;
}
