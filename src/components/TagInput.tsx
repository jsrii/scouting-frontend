import { useEffect, useState } from "react";
import { TagsInput } from "@ark-ui/react";
import { Chip } from "@nextui-org/react";

interface TagsInputProps {
  inputLabel: string;
  inputPlaceholder: string;
  onTagsChange: (tags: string[]) => void; // Add this prop
  loadTags: string[];
}

export const TagInput = ({
  inputLabel,
  inputPlaceholder,
  onTagsChange,
  loadTags,
}: TagsInputProps) => {
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    if (loadTags?.length > 0) {
      setTags(loadTags);
    }
  }, [loadTags]);

  const handleTagAdd = (newTag: string) => {
    if (newTag && !tags.includes(newTag)) {
      const updatedTags = [...tags, newTag];
      setTags(updatedTags);
      onTagsChange(updatedTags);
    }
  };

  const handleTagRemove = (index: number) => {
    const updatedTags = tags.filter((_, i) => i !== index);
    setTags(updatedTags);
    onTagsChange(updatedTags);
  };

  return (
    <TagsInput.Root max={3} value={tags}>
      <TagsInput.Context>
        {(tagsInput) => (
          <>
            <TagsInput.Label className="mb-4">{inputLabel}</TagsInput.Label>
            <TagsInput.Control className="border p-4 rounded-lg flex flex-col focus-within:border-black focus-within:ring-2 focus-within:ring-black">
              <div className="flex gap-2 mb-2">
                {tags.map((value, index) => (
                  <TagsInput.Item
                    className=""
                    id={value}
                    key={index}
                    index={index}
                    value={value}
                  >
                    <TagsInput.ItemPreview>
                      <Chip
                        onClose={() => handleTagRemove(index)}
                        variant="bordered"
                      >
                        {value}
                      </Chip>
                    </TagsInput.ItemPreview>
                    <TagsInput.ItemInput />
                  </TagsInput.Item>
                ))}
              </div>
              <TagsInput.Input
                className="p-1 outline-none w-28 focus:border-black-500"
                placeholder={inputPlaceholder}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && tagsInput.inputValue) {
                    handleTagAdd(tagsInput.inputValue);
                    tagsInput.setInputValue(""); // Clear input after adding a tag
                  }
                }}
              />
            </TagsInput.Control>
          </>
        )}
      </TagsInput.Context>
      <TagsInput.HiddenInput />
    </TagsInput.Root>
  );
};
