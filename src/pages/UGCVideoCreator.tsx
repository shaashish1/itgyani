import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload, Video } from "lucide-react";
import SEO from "@/components/SEO";

const formSchema = z.object({
  description: z.string().min(10, "Description must be at least 10 characters").max(1000, "Description must be less than 1000 characters"),
  image: z.instanceof(FileList).refine((files) => files.length > 0, "Please upload an image"),
});

type FormData = z.infer<typeof formSchema>;

const UGCVideoCreator = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string>("");
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("description", data.description);
      
      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }

      const response = await fetch(
        "https://n8n.itgyani.com/webhook/31abdab0-4859-46e6-8a16-867b79604ff1",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit video request");
      }

      toast({
        title: "Success!",
        description: "Your video creation request has been submitted.",
      });

      form.reset();
      setSelectedFileName("");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "Failed to submit your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO 
        title="UGC Video Creator | AI Workflow Automation"
        description="Create custom UGC videos with AI. Upload your image and describe the video you want to generate."
        canonicalUrl="/ugc-video-creator"
      />
      
      <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Video className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              UGC Video Creator
            </h1>
            <p className="text-lg text-muted-foreground">
              Transform your ideas into engaging UGC videos powered by AI
            </p>
          </div>

          <div className="bg-card rounded-lg shadow-lg p-8 border border-border">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold">
                        Describe The Video You Want
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your video in detail... (e.g., 'A product demo showing our new smartwatch with a professional presenter explaining features')"
                          className="min-h-[150px] resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="image"
                  render={({ field: { onChange, value, ...field } }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold">
                        Upload Image
                      </FormLabel>
                      <FormControl>
                        <div className="space-y-2">
                          <Label
                            htmlFor="image-upload"
                            className="flex items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors bg-muted/30"
                          >
                            <div className="text-center">
                              <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">
                                {selectedFileName || "Click to upload an image"}
                              </span>
                            </div>
                          </Label>
                          <Input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            {...field}
                            onChange={(e) => {
                              onChange(e.target.files);
                              setSelectedFileName(
                                e.target.files?.[0]?.name || ""
                              );
                            }}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Create Video"
                  )}
                </Button>
              </form>
            </Form>
          </div>

          <div className="mt-8 bg-muted/50 rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-3">Tips for Best Results:</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Be specific in your description - include details about style, tone, and key messages</li>
              <li>• Upload high-quality images (JPG, PNG) for better results</li>
              <li>• Describe the desired length and pacing of your video</li>
              <li>• Mention any specific calls-to-action you want included</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default UGCVideoCreator;
