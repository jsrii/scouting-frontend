import { Avatar } from "@nextui-org/react";

interface UserNameAvatarProps {
  avatarURL: string;
}

function UserNameAvatar({ avatarURL }: UserNameAvatarProps) {
  return (
    <a target="#" href={avatarURL} className="">
      <Avatar isBordered radius="sm" src={avatarURL} className="w-14 h-14" />
    </a>
  );
}

export default UserNameAvatar;
