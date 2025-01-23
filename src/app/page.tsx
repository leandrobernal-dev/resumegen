"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { BackToTop } from "@/components/back-to-top";
import {
    ArrowRight,
    CheckCircle2,
    FileText,
    Layout,
    Settings2,
    Star,
} from "lucide-react";

const templates = [
    {
        id: "classic",
        name: "Classic",
        image: "/file.svg",
        description: "Traditional layout with centered header",
    },
    {
        id: "modern",
        name: "Modern",
        image: "/file.svg",
        description: "Contemporary design with sidebar",
    },
    {
        id: "minimalist",
        name: "Minimalist",
        image: "/file.svg",
        description: "Clean two-column layout with icons",
    },
    {
        id: "professional",
        name: "Professional",
        image: "/file.svg",
        description: "Traditional with accent colors",
    },
];

const features = [
    {
        icon: FileText,
        title: "Easy to Use",
        description:
            "Our intuitive interface guides you through every step of creating your CV.",
    },
    {
        icon: Layout,
        title: "Professional Templates",
        description:
            "Choose from our collection of ATS-friendly, professionally designed templates.",
    },
    {
        icon: Settings2,
        title: "Customizable",
        description:
            "Personalize every aspect of your CV to match your style and industry.",
    },
];

const testimonials = [
    {
        name: "Sarah Johnson",
        role: "Software Engineer",
        content:
            "topRes helped me create a professional CV that landed me my dream job. The templates are modern and the interface is so easy to use!",
        rating: 5,
    },
    {
        name: "Michael Chen",
        role: "Marketing Manager",
        content:
            "I was amazed by how quickly I could create a polished CV. The customization options are fantastic and the final result looks great.",
        rating: 5,
    },
    {
        name: "Emily Brown",
        role: "Graphic Designer",
        content:
            "The templates are beautifully designed and the whole process is seamless. Highly recommend for creative professionals!",
        rating: 5,
    },
];

const faqs = [
    {
        question: "What is a CV?",
        answer: "A CV (Curriculum Vitae) is a comprehensive document that outlines your professional and academic history. It serves as a marketing tool to present your skills, experience, and qualifications to potential employers.",
    },
    {
        question: "What sections should I include in my CV?",
        answer: "Essential sections include: Personal Information, Professional Summary, Work Experience, Education, and Skills. Optional sections can include: Languages, Certifications, Projects, Publications, Awards, and Volunteer Experience.",
    },
    {
        question: "How long should my CV be?",
        answer: "The ideal length of a CV depends on your experience and industry. Generally, it should be 1-2 pages for early career professionals, and can be longer for academic or senior positions.",
    },
];

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-secondary via-background to-background">
                <div className="container px-4 w-10/12 mx-auto md:px-6">
                    <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
                        <div className="flex flex-col justify-center space-y-4">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                                    Create Your Professional
                                    <span className="block gradient-text">
                                        CV in Minutes
                                    </span>
                                </h1>
                                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                                    Free online CV maker with professional
                                    templates. No registration required.
                                </p>
                            </div>
                            <div className="flex flex-col gap-2 min-[400px]:flex-row">
                                <Link href="/builder">
                                    <Button
                                        size="lg"
                                        className="group bg-primary hover:bg-primary/90"
                                    >
                                        Create your CV now
                                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </Button>
                                </Link>
                            </div>
                            <div className="flex items-center gap-4 text-sm">
                                <div className="flex items-center gap-1">
                                    <CheckCircle2 className="h-4 w-4 text-primary" />
                                    <span>Free forever</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <CheckCircle2 className="h-4 w-4 text-primary" />
                                    <span>No registration</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <CheckCircle2 className="h-4 w-4 text-primary" />
                                    <span>ATS-friendly</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-center lg:order-last">
                            <DotLottieReact
                                src="https://lottie.host/58783af6-3fd3-474c-b3cc-3d607f680fc8/4FuejBjtKu.lottie"
                                loop
                                autoplay
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="w-full py-12 md:py-24 lg:py-32">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col items-center justify-center space-y-4 text-center">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                            Features that Make a Difference
                        </h2>
                        <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                            Everything you need to create a professional CV that
                            stands out
                        </p>
                    </div>
                    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-12">
                        {features.map((feature) => {
                            const Icon = feature.icon;
                            return (
                                <Card
                                    key={feature.title}
                                    className="relative overflow-hidden"
                                >
                                    <CardContent className="p-6">
                                        <div className="flex flex-col items-center space-y-4 text-center">
                                            <div className="rounded-full bg-secondary p-3">
                                                <Icon className="h-6 w-6 text-primary" />
                                            </div>
                                            <h3 className="text-xl font-bold">
                                                {feature.title}
                                            </h3>
                                            <p className="text-muted-foreground">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section
                id="templates"
                className="w-full py-12 md:py-24 lg:py-32 bg-secondary/30"
            >
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col items-center justify-center space-y-4 text-center">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                            Professional CV Templates
                        </h2>
                        <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                            Choose from our collection of professionally
                            designed templates
                        </p>
                    </div>
                    <div className="grid gap-6 mt-12 md:grid-cols-2 lg:grid-cols-4">
                        {templates.map((template) => (
                            <Card
                                key={template.id}
                                className="group overflow-hidden transition-all hover:shadow-lg"
                            >
                                <CardContent className="p-0">
                                    <div className="relative aspect-[210/297] overflow-hidden">
                                        <Image
                                            src={
                                                template.image ||
                                                "/placeholder.svg"
                                            }
                                            alt={template.name}
                                            fill
                                            className="object-cover transition-transform group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-semibold">
                                            {template.name}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            {template.description}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                    <div className="flex justify-center mt-12">
                        <Link href="/builder">
                            <Button size="lg" className="group">
                                Create Your CV Now
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* <section className="w-full py-12 md:py-24 lg:py-32">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col items-center justify-center space-y-4 text-center">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                            What Our Users Say
                        </h2>
                        <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                            Join thousands of satisfied users who have created
                            their perfect CV
                        </p>
                    </div>
                    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-12">
                        {testimonials.map((testimonial) => (
                            <Card
                                key={testimonial.name}
                                className="relative overflow-hidden"
                            >
                                <CardContent className="p-6">
                                    <div className="flex flex-col space-y-4">
                                        <div className="flex gap-0.5">
                                            {Array.from({
                                                length: testimonial.rating,
                                            }).map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className="h-5 w-5 fill-primary text-primary"
                                                />
                                            ))}
                                        </div>
                                        <p className="text-muted-foreground">
                                            {testimonial.content}
                                        </p>
                                        <div>
                                            <p className="font-semibold">
                                                {testimonial.name}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {testimonial.role}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section> */}

            <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary/30">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col items-center justify-center space-y-4 text-center">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                            Frequently Asked Questions
                        </h2>
                        <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                            Get answers to common questions about creating your
                            CV
                        </p>
                    </div>
                    <div className="mx-auto max-w-3xl mt-12">
                        <Accordion type="single" collapsible className="w-full">
                            {faqs.map((faq, index) => (
                                <AccordionItem
                                    key={index}
                                    value={`item-${index}`}
                                >
                                    <AccordionTrigger className="text-left">
                                        {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </section>

            <BackToTop />
        </div>
    );
}
