"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createPitch } from "@/lib/actions";
import { useFormState } from "react-dom";

// Define the result type
interface PitchResult {
  _id?: string;
  error: string;
  status: string;
  [key: string]: any;
}

const StartUpForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        pitch,
      };

      await formSchema.parseAsync(formValues);

      const result = await createPitch(prevState, formData, pitch) as PitchResult;

      if (result.status == "SUCCESS") {
        toast({
          title: "Success",
          description: "Your startup pitch has been created successfully",
          variant: "success",
        });

        router.push(`/startup/${result._id}`);
      }

      return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;

        setErrors(fieldErrors as unknown as Record<string, string>);

        toast({
          title: "Error",
          description: "Please check your inputs and try again",
          variant: "destructive",
        });

        return { ...prevState, error: "Validation failed", status: "ERROR" };
      }

      toast({
        title: "Error",
        description: "An unexpected error has occurred",
        variant: "destructive",
      });

      return {
        ...prevState,
        error: "An unexpected error has occurred",
        status: "ERROR",
      };
    }
  };

  const [state, formAction] = useFormState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  // Display server-side errors
  useEffect(() => {
    if (state.error && state.status === "ERROR") {
      toast({
        title: "Error",
        description: state.error,
        variant: "destructive",
      });
    }
  }, [state.error, state.status, toast]);

  return (
    <form action={formAction} className="startup-form text-black bg-white">
      <div>
        <label htmlFor="title" className="startup-form_label text-black">
          Title
        </label>
        <Input
          id="title"
          name="title"
          className={`startup-form_input text-black bg-gray-100 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${errors.title ? 'border-red-500' : ''}`}
          required
          placeholder="Startup Title"
        />

        {errors.title && <p className="startup-form_error text-red-500 font-medium">{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="description" className="startup-form_label text-black">
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          className={`startup-form_textarea text-black bg-gray-100 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${errors.description ? 'border-red-500' : ''}`}
          required
          placeholder="Startup Description"
        />

        {errors.description && (
          <p className="startup-form_error text-red-500 font-medium">{errors.description}</p>
        )}
      </div>

      <div>
        <label htmlFor="category" className="startup-form_label text-black">
          Category
        </label>
        <Input
          id="category"
          name="category"
          className={`startup-form_input text-black bg-gray-100 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${errors.category ? 'border-red-500' : ''}`}
          required
          placeholder="Startup Category (Tech, Health, Education...)"
        />

        {errors.category && (
          <p className="startup-form_error text-red-500 font-medium">{errors.category}</p>
        )}
      </div>

      <div>
        <label htmlFor="link" className="startup-form_label text-black">
          Image URL
        </label>
        <Input
          id="link"
          name="link"
          className={`startup-form_input text-black bg-gray-100 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${errors.link ? 'border-red-500' : ''}`}
          required
          placeholder="Startup Image URL"
        />

        {errors.link && <p className="startup-form_error text-red-500 font-medium">{errors.link}</p>}
      </div>

      <div data-color-mode="light">
        <label htmlFor="pitch" className="startup-form_label text-black">
          Pitch
        </label>

        <MDEditor
          value={pitch}
          onChange={(value) => setPitch(value as string)}
          id="pitch"
          preview="edit"
          height={300}
          style={{ borderRadius: 20, overflow: "hidden" }}
          textareaProps={{
            placeholder:
              "Briefly describe your idea and what problem it solves",
          }}
          previewOptions={{
            disallowedElements: ["style"],
          }}
        />

        {errors.pitch && <p className="startup-form_error text-red-500 font-medium">{errors.pitch}</p>}
      </div>

      <Button
        type="submit"
        variant="red"
        className="startup-form_btn mb-8 cursor-pointer"
        disabled={state.status === "PENDING"}
      >
        {state.status === "PENDING" ? "Submitting..." : "Submit Your Pitch"}
        <Send className="size-6 ml-2" />
      </Button>
    </form>
  );
};

export default StartUpForm;