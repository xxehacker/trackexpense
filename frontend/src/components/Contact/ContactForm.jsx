import React from "react";
import contact from "../../assets/contact.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import { contactApi } from "@/services/contact/contactService";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^\d+$/, "Phone number must contain only digits")
    .min(10, "Phone number must be at least 10 characters")
    .max(15, "Phone number must be at most 15 characters")
    .required("Phone number is required"),
  message: Yup.string()
    .min(15, "Message must be at least 15 characters long")
    .required("Message is required"),
});

const ContactForm = () => {
  const navigate = useNavigate();

  // only authenticated users can send messages
  const token = localStorage.getItem("token");

  const { mutateAsync, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: contactApi,
    mutationKey: ["contact"],
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    },
    validationSchema,
    onSubmit: (values) => {
      if (!token) {
        toast.error("Please login to send a message to the admin");
        navigate("/login");
        return;
      }

      mutateAsync(values)
        .then((data) => {
          toast.success(data.message);
          formik.resetForm();
        })
        .catch((error) => {
          toast.error(error.message);
        });
    },
  });

  return (
    <div
      id="contact"
      className="min-h-screen bg-[#0A051D] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-[#0A051D] to-[#0A051D] p-6 flex items-center justify-center"
    >
      <div className="w-full max-w-5xl text-center">
        <div className="space-y-3 mb-16">
          <h1 className="text-5xl font-bold text-white tracking-tight">
            Get in{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
              touch
            </span>
          </h1>
          <p className="text-gray-400 text-base">
            Reach out, and let's create a universe of possibilities together!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="backdrop-blur-xl bg-white/[0.02] border border-white/[0.05] rounded-2xl p-8 shadow-2xl">
            <div className="space-y-2 mb-8">
              <h2 className="text-xl font-semibold text-white text-left">
                Let's start a conversation
              </h2>
              <p className="text-gray-400 text-sm text-left">
                If you have any questions or need help, feel free to send us a
                message.
              </p>
            </div>

            <form onSubmit={formik.handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <input
                    placeholder="First Name"
                    className="w-full bg-white/[0.03] border border-white/[0.05] rounded-lg p-3 text-sm text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 outline-none transition-all duration-300"
                    type="text"
                    name="firstName"
                    id="firstName"
                    required
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.firstName && formik.errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">
                      {formik.errors.firstName}
                    </p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <input
                    placeholder="Last Name"
                    className="w-full bg-white/[0.03] border border-white/[0.05] rounded-lg p-3 text-sm text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 outline-none transition-all duration-300"
                    type="text"
                    name="lastName"
                    id="lastName"
                    required
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.lastName && formik.errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">
                      {formik.errors.lastName}
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-1.5">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full bg-white/[0.03] border border-white/[0.05] rounded-lg p-3 text-sm text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 outline-none transition-all duration-300"
                  name="email"
                  id="email"
                  required
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.email}
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full bg-white/[0.03] border border-white/[0.05] rounded-lg p-3 text-sm text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 outline-none transition-all duration-300"
                  name="phone"
                  id="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.phone}
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <textarea
                  placeholder="Your message"
                  className="w-full bg-white/[0.03] border border-white/[0.05] rounded-lg p-3 text-sm text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 outline-none h-32 resize-none transition-all duration-300"
                  type="textarea"
                  name="message"
                  id="message"
                  required
                  value={formik.values.message}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.message && formik.errors.message && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-3 px-6 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center group shadow-lg shadow-purple-500/25"
              >
                <span>Send message</span>
                <span className="ml-2 group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </button>
            </form>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={contact}
              alt="Astronaut floating in space"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent">
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="text-white/90 text-sm font-light italic leading-relaxed">
                  "Smart financial tracking transformed our chaotic spending
                  into clear patterns, revealing the true power of mindful
                  budgeting"
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="h-px w-8 bg-purple-500/50"></div>
                  <p className="text-purple-400 text-sm font-medium">
                    Financial Insights
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
