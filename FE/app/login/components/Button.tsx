"use client";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <div
      className="
        bg-sky-100
        hover:bg-sky-200
        rounded-md
        ring-1
        ring-inset
        ring-blue-200
        h-14
        p-4
        inline-block
        w-[14%]
    "
    >
      <button onClick={onClick}>
        <p className="mx-auto">{children}</p>
      </button>
    </div>
  );
};

export default Button;
