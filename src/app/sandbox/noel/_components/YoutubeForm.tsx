"use client";
import { Button } from "@/components/ui/button";
import { FC } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { Input } from "@/components/ui/input";

interface YoutubeFormProps {
  user: {
    username: string;
    email: string;
    channel: string;
  };
}

type FormValues = {
  username: string;
  email: string;
  channel: string;
  social: {
    twitter: string;
    facebook: string;
  };
  phoneNumbers: string[];
  phNumbers: {
    number: string;
  }[];
};

const YoutubeForm: FC<YoutubeFormProps> = ({ user }) => {
  const form = useForm<FormValues>({
    defaultValues: {
      ...user,
      social: {
        twitter: "",
        facebook: "",
      },
      phoneNumbers: ["", ""],
      phNumbers: [{ number: "908-575-0053" }],
    },
  });
  const { register, control, handleSubmit, formState } = form;
  const { errors, isDirty } = formState;
  const { fields, append, remove, move } = useFieldArray({
    name: "phNumbers",
    control,
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted\n", data);
    console.log("data changed", isDirty);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="max-w-xl mx-auto"
      >
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          className="w-full mb-1"
          {...register("username", {
            required: "Username is required",
          })}
        />
        <p className="text-xs text-red-500 mb-4">{errors.username?.message}</p>
        <label htmlFor="email">E-mail</label>
        <input
          type="text"
          id="email"
          className="w-full mb-1"
          {...register("email", {
            validate: {
              notAdmin: (fieldValue) => {
                const errorMessage = "Enter a different email address";
                return fieldValue !== "admin@example.com" || errorMessage;
              },
              blackListedDomain: (fieldValue) => {
                const errorMessage = "This domain is not supported";
                return !fieldValue.endsWith("@evil.com") || errorMessage;
              },
            },
          })}
        />
        <p className="text-xs text-red-500 mb-4">{errors.email?.message}</p>

        <label htmlFor="channel">Channel</label>
        <input
          id="channel"
          type="text"
          className="w-full mb-1"
          {...register("channel", {
            required: "Channel is required",
          })}
        />
        <p className="text-xs text-red-500 mb-4">{errors.channel?.message}</p>

        <label htmlFor="twitter">Twitter</label>
        <input
          id="twitter"
          type="text"
          className="w-full mb-1"
          {...register("social.twitter")}
        />

        <label htmlFor="facebook">Facebook</label>
        <input
          id="facebook"
          type="text"
          className="w-full mb-1"
          {...register("social.facebook")}
        />

        <label htmlFor="primary-phone">Primary phone number</label>
        <input
          id="primary-phone"
          type="text"
          className="w-full mb-1"
          {...register("phoneNumbers.0")}
        />

        <label htmlFor="secondary-phone">Secondary phone number</label>
        <input
          id="secondary-phone"
          type="text"
          className="w-full mb-1"
          {...register("phoneNumbers.1")}
        />

        <div>
          <label>List of phone numbers</label>
          <div>
            {fields.map((field, index) => {
              return (
                <div key={field.id}>
                  <Input
                    type="text"
                    {...register(`phNumbers.${index}.number` as const)}
                  />
                  {/* <input
                    type="text"
                    {...register(`phNumbers.${index}.number` as const)}
                  /> */}
                  <Button variant="destructive" onClick={() => remove(index)}>
                    Remove
                  </Button>
                  <Button variant="destructive" onClick={() => move(index, 0)}>
                    Move
                  </Button>
                </div>
              );
            })}
            <Button onClick={() => append({ number: "" })}>
              Add phone number
            </Button>
          </div>
        </div>

        <Button>Submit</Button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default YoutubeForm;
