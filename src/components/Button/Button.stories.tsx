import { Meta, StoryObj } from "@storybook/react/*";
import Button from "./Button";
import { ButtonSize, ButtonVarient } from "./Button.types";
import { FaRegThumbsUp, FaRegCommentDots, FaRetweet } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { AiOutlineRetweet } from "react-icons/ai";
import { HiXMark } from "react-icons/hi2";
import { PiNotePencil } from "react-icons/pi";
import { BsThreeDots } from "react-icons/bs";
import { useEffect, useState } from "react";
import { FaThumbsUp } from "react-icons/fa";

const meta: Meta<typeof Button> = {
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

/**
 * Story showcasing a large social button with like functionality.
 *
 * This story demonstrates how the button:
 * - Changes icon when liked/unliked
 * - Handles loading state during the like action
 * - Uses the SOCIAL variant and LARGE size
 *
 * @story
 * @name  LargeSocialButton
 */
export const LargeSocialButton: Story = {
  args: {
    size: ButtonSize.LARGE,
    varient: ButtonVarient.SOCIAL,
  },

  render: (args) => {
    const { varient, size } = args;

    const [loading, setLoading] = useState<boolean>(false);
    // mimicing fake like state (would be in an object)
    const [isLiked, setIsLiked] = useState<boolean>(false);

    const addLike = async () => {
      setLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      setLoading((prevValue) => !prevValue);
      setIsLiked((prevValue) => !prevValue);
    };

    const liked = isLiked ? (
      <FaThumbsUp className="text-blue-500" />
    ) : (
      <FaRegThumbsUp />
    );
    return (
      <Button
        liked={isLiked}
        onClick={addLike}
        startIcon={liked}
        loading={loading}
        varient={varient}
        size={size}
      ></Button>
    );
  },
};


/**
 * 
 * Story showcasing a "Post" button with loading, success, and error states.
 * 
 * @story
 * @name PostButton
 * 
 */

export const PostButton: Story = {
  args: {
    size: ButtonSize.SMALL,
    varient: ButtonVarient.PRIMARY,
    children: "Post",
  },

  render: (args) => {
    const { children, size, varient } = args;

    const [loading, setLoading] = useState<boolean>(false);
    const [arr, setArr] = useState<string[]>([]);
    const inputTest = "This is the first post to your post";
    const [uiMessages, setUiMessages] = useState({
      error: false,
      succcess: false,
    });

    const addPost = async () => {
      setLoading(true);
      setUiMessages({ error: false, succcess: false });

      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);

      const random = Math.floor(Math.random() * 9);
      // 25% chance of error occuring. Only for testing purposes
      if (random <= 2) {
        return setUiMessages({ error: true, succcess: false });
      } else {
        setArr([...arr, inputTest]);
        setUiMessages({ error: false, succcess: true });
      }
    };

    useEffect(() => {
      const uiFunction = async () => {
        setTimeout(() => {
          setUiMessages({ error: false, succcess: false });
        }, 1000);
      };

      if (uiMessages.error || uiMessages.succcess) uiFunction();
    }, [uiMessages]);

    return (
      <Button onClick={addPost} size={size} varient={varient} loading={loading}>
        {uiMessages.error
          ? "Error occured"
          : uiMessages.succcess
            ? "Success"
            : children}
      </Button>
    );
  },
};

export const tertiaryButton: Story = {
  args: {
    varient: ButtonVarient.TERTIARY,
    // either use: BsThreeDots, HiXMark, PiNotePencil, TBD
    startIcon: <BsThreeDots />,
  },
};
