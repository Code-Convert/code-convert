"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Check, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/shadcn-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/shadcn-input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/shadcn-textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { OnboardingHeader } from "@/components/ui/onboarding-header";
import { FocusModeOverlay } from "@/components/ui/focus-mode-overlay";

const steps = [
  { id: "introduction", title: "Introduction" },
  { id: "primary-goal", title: "Primary Goal" },
  { id: "growth-stage", title: "Growth Stage" },
  { id: "challenge", title: "Challenge" },
  { id: "company", title: "Company" },
  { id: "decision", title: "Decision" },
  { id: "revenue", title: "Revenue" },
  { id: "readiness", title: "Readiness" },
  { id: "context", title: "Context" },
  { id: "contact", title: "Contact" },
  { id: "meeting", title: "Meeting" },
];

interface FormData {
  name: string;
  primaryGoal: string;
  sellsTo: string;
  growthStage: string;
  biggestChallenge: string;
  exploringReason: string;
  companyName: string;
  websiteUrl: string;
  industry: string;
  industryOther: string;
  role: string;
  decisionAuthority: string;
  monthlyRevenue: string;
  monthlyAdSpend: string;
  budgetAllocated: string;
  implementationTimeline: string;
  actionLikelihood: string;
  additionalContext: string;
  email: string;
  phone: string;
  meetingPreference: string;
}

interface FormErrors {
  name?: string;
  primaryGoal?: string;
  sellsTo?: string;
  growthStage?: string;
  biggestChallenge?: string;
  exploringReason?: string;
  companyName?: string;
  industry?: string;
  role?: string;
  decisionAuthority?: string;
  monthlyRevenue?: string;
  monthlyAdSpend?: string;
  budgetAllocated?: string;
  implementationTimeline?: string;
  actionLikelihood?: string;
  email?: string;
  phone?: string;
  meetingPreference?: string;
}

type LeadTemperature = 'hot' | 'warm' | 'cold';

const scoreLead = (data: FormData): { score: number; temperature: LeadTemperature } => {
  let score = 0;

  if (['2m-10m', '10m+'].includes(data.monthlyRevenue)) score += 3;
  else if (['500k-1m', '1m-2m'].includes(data.monthlyRevenue)) score += 2;
  else if (data.monthlyRevenue) score += 1;

  if (data.budgetAllocated === 'yes') score += 3;
  else if (data.budgetAllocated === 'still-deciding') score += 1;

  if (['final-decision', 'shared-decision'].includes(data.decisionAuthority)) score += 2;

  if (data.implementationTimeline === 'immediately') score += 3;
  else if (data.implementationTimeline === 'within-30-days') score += 2;
  else if (data.implementationTimeline === 'within-90-days') score += 1;

  if (data.actionLikelihood === 'very-likely') score += 3;
  else if (data.actionLikelihood === 'likely') score += 2;
  else if (data.actionLikelihood === 'unsure') score += 1;

  // Normalise to 0-100
  const normalised = Math.round((score / 14) * 100);

  const temperature: LeadTemperature =
    normalised >= 70 ? 'hot' : normalised >= 40 ? 'warm' : 'cold';

  return { score: normalised, temperature };
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const contentVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, x: -50, transition: { duration: 0.2 } },
};

interface OnboardingFormProps {
  isFocusMode: boolean;
  onActivateFocus: () => void;
  onDeactivateFocus: () => void;
  sourcePage: string;
}

const OnboardingForm = ({ isFocusMode, onActivateFocus, onDeactivateFocus, sourcePage }: OnboardingFormProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState<FormData>({
    name: "",
    primaryGoal: "",
    sellsTo: "",
    growthStage: "",
    biggestChallenge: "",
    exploringReason: "",
    companyName: "",
    websiteUrl: "",
    industry: "",
    industryOther: "",
    role: "",
    decisionAuthority: "",
    monthlyRevenue: "",
    monthlyAdSpend: "",
    budgetAllocated: "",
    implementationTimeline: "",
    actionLikelihood: "",
    additionalContext: "",
    email: "",
    phone: "",
    meetingPreference: "",
  });

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const isValidEmail = (email: string): boolean =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isValidName = (name: string): boolean =>
    /^[a-zA-Z\s]{2,}$/.test(name.trim());

  const validateStep = (): FormErrors => {
    const newErrors: FormErrors = {};

    switch (currentStep) {
      case 0:
        if (!formData.name.trim()) newErrors.name = "Name is required";
        else if (!isValidName(formData.name)) newErrors.name = "Please enter a valid name (letters only, minimum 2 characters)";
        break;
      case 1:
        if (!formData.primaryGoal) newErrors.primaryGoal = "Please select a primary goal";
        if (!formData.sellsTo) newErrors.sellsTo = "Please select who you sell to";
        break;
      case 2:
        if (!formData.growthStage) newErrors.growthStage = "Please select your growth stage";
        break;
      case 3:
        if (!formData.biggestChallenge) newErrors.biggestChallenge = "Please select your biggest challenge";
        if (!formData.exploringReason) newErrors.exploringReason = "Please select why you are exploring support";
        break;
      case 4:
        if (!formData.companyName.trim()) newErrors.companyName = "Company name is required";
        if (!formData.industry) newErrors.industry = "Please select an industry";
        break;
      case 5:
        if (!formData.role) newErrors.role = "Please select your role";
        if (!formData.decisionAuthority) newErrors.decisionAuthority = "Please select your decision-making authority";
        break;
      case 6:
        if (!formData.monthlyRevenue) newErrors.monthlyRevenue = "Please select your monthly revenue";
        if (!formData.monthlyAdSpend) newErrors.monthlyAdSpend = "Please select your monthly ad spend";
        if (!formData.budgetAllocated) newErrors.budgetAllocated = "Please select a budget option";
        break;
      case 7:
        if (!formData.implementationTimeline) newErrors.implementationTimeline = "Please select a timeline";
        if (!formData.actionLikelihood) newErrors.actionLikelihood = "Please select your likelihood to act";
        break;
      case 9:
        if (!formData.name.trim()) newErrors.name = "Full name is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        else if (!isValidEmail(formData.email)) newErrors.email = "Please enter a valid email address";
        if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
        break;
      case 10:
        if (!formData.meetingPreference) newErrors.meetingPreference = "Please select a meeting preference";
        break;
    }

    setErrors(newErrors);
    return newErrors;
  };

  const nextStep = () => {
    const newErrors = validateStep();
    if (Object.keys(newErrors).length === 0) {
      if (currentStep < steps.length - 1) {
        setCurrentStep((prev) => prev + 1);
        setErrors({});
      }
    } else {
      const first = Object.values(newErrors).find(Boolean);
      if (first) toast.error(first);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      setErrors({}); // Clear errors when going back
    }
  };

  const handleSubmit = async () => {
    const newErrors = validateStep();
    if (Object.keys(newErrors).length > 0) {
      const first = Object.values(newErrors).find(Boolean);
      if (first) toast.error(first);
      return;
    }

    setIsSubmitting(true);

    try {
      const params = new URLSearchParams(window.location.search);
      const { score, temperature } = scoreLead(formData);

      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          source_page: sourcePage,
          source_url: window.location.href,
          utm_source: params.get('utm_source') || null,
          utm_medium: params.get('utm_medium') || null,
          utm_campaign: params.get('utm_campaign') || null,
          utm_content: params.get('utm_content') || null,
          utm_term: params.get('utm_term') || null,
          primary_goal: formData.primaryGoal,
          sells_to: formData.sellsTo,
          growth_stage: formData.growthStage,
          biggest_challenge: formData.biggestChallenge,
          exploring_reason: formData.exploringReason,
          company_name: formData.companyName,
          website_url: formData.websiteUrl,
          industry: formData.industry,
          industry_other: formData.industryOther,
          role: formData.role,
          decision_authority: formData.decisionAuthority,
          monthly_revenue: formData.monthlyRevenue,
          monthly_ad_spend: formData.monthlyAdSpend,
          budget_allocated: formData.budgetAllocated,
          implementation_timeline: formData.implementationTimeline,
          action_likelihood: formData.actionLikelihood,
          additional_context: formData.additionalContext,
          meeting_preference: formData.meetingPreference,
          lead_score: score,
          lead_temperature: temperature,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Submission failed');
      }

      setIsSubmitted(true);
      toast.success("Application received! We'll be in touch shortly.");
      onDeactivateFocus();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="w-full max-w-lg mx-auto py-8">
        <Card className="relative z-10 border border-white/10 shadow-2xl rounded-3xl overflow-hidden bg-white/5">
          <CardContent className="flex flex-col items-center text-center space-y-6 py-16 px-8">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
              className="w-20 h-20 rounded-full bg-green-500/15 border border-green-500/40 flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.25 }}
              >
                <Check className="w-9 h-9 text-green-400" strokeWidth={2.5} />
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.35 }}
              className="space-y-2"
            >
              <h2 className="text-2xl font-bold">You&apos;re all set!</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Thanks for reaching out, <span className="text-white font-medium">{formData.name}</span>. We&apos;ve received your details and will be in touch shortly to confirm your session.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              className="flex items-center gap-2 text-xs text-muted-foreground border border-white/10 rounded-full px-4 py-2"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Submission confirmed
            </motion.div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <motion.div
      layoutId="onboarding-card"
      layout
      transition={{ type: "spring", stiffness: 250, damping: 25 }}
      className={cn(
        isFocusMode
          ? "fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 pointer-events-none"
          : "w-full py-8"
      )}
    >
      <AnimatePresence>
        {isFocusMode && <FocusModeOverlay />}
      </AnimatePresence>
        <Card
          className={cn(
            "relative z-10 border border-white/10 shadow-2xl rounded-3xl overflow-hidden pointer-events-auto",
            isFocusMode
              ? "w-full max-w-[1100px] max-h-[90vh] overflow-y-auto bg-[#0e0e0e]"
              : "w-full max-w-lg mx-auto bg-white/5"
          )}
        >
          <div>
            <AnimatePresence>
              {isFocusMode && (
                <motion.div
                  key="onboarding-header"
                  className="px-6 pt-6"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <OnboardingHeader
                        currentStep={currentStep}
                        totalSteps={steps.length}
                        stepTitle={steps[currentStep].title}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={onDeactivateFocus}
                      className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-colors"
                      aria-label="Close"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={contentVariants}
              >
                {/* Step 1: Introduction */}
                {currentStep === 0 && (
                  <>
                    {!isFocusMode && (
                      <CardHeader>
                        <CardTitle>Introduction</CardTitle>
                        <CardDescription>Let&apos;s start with your name</CardDescription>
                      </CardHeader>
                    )}
                    <CardContent className="space-y-4">
                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label htmlFor="name">What&apos;s your name?</Label>
                        <Input
                          id="name"
                          placeholder="Your name"
                          value={formData.name}
                          onChange={(e) => updateFormData("name", e.target.value)}
                          onFocus={onActivateFocus}
                          className="transition-all duration-300 focus:ring-1 focus:ring-primary/20 focus:border-primary"
                        />
                        {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                      </motion.div>
                    </CardContent>
                  </>
                )}

                {/* Step 2: Primary Goal */}
                {currentStep === 1 && (
                  <>
                    {!isFocusMode && (
                      <CardHeader>
                        <CardTitle>Primary Goal</CardTitle>
                        <CardDescription>Help us understand what you&apos;re working towards</CardDescription>
                      </CardHeader>
                    )}
                    <CardContent className="space-y-6">
                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label>What is the main outcome you&apos;re hoping to achieve over the next 12 months?</Label>
                        <RadioGroup
                          value={formData.primaryGoal}
                          onValueChange={(value) => updateFormData("primaryGoal", value)}
                          className="space-y-2"
                        >
                          {[
                            { value: "more-leads", label: "Generate more qualified leads" },
                            { value: "increase-sales", label: "Increase sales revenue" },
                            { value: "improve-conversion", label: "Improve conversion rates" },
                            { value: "scale-business", label: "Scale an already successful business" },
                            { value: "launch-product", label: "Launch a new product or service" },
                            { value: "other", label: "Other" },
                          ].map((option, index) => (
                            <motion.div
                              key={option.value}
                              className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-accent transition-colors"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0, transition: { delay: 0.05 * index, duration: 0.3 } }}
                            >
                              <RadioGroupItem value={option.value} id={`goal-${index}`} />
                              <Label htmlFor={`goal-${index}`} className="cursor-pointer w-full">{option.label}</Label>
                            </motion.div>
                          ))}
                        </RadioGroup>
                        {errors.primaryGoal && <p className="text-sm text-destructive">{errors.primaryGoal}</p>}
                      </motion.div>

                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label>Who do you primarily sell to?</Label>
                        <RadioGroup
                          value={formData.sellsTo}
                          onValueChange={(value) => updateFormData("sellsTo", value)}
                          className="space-y-2"
                        >
                          {[
                            { value: "b2b", label: "Businesses (B2B)" },
                            { value: "b2c", label: "Consumers (B2C)" },
                            { value: "both", label: "Both" },
                          ].map((option, index) => (
                            <motion.div
                              key={option.value}
                              className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-accent transition-colors"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0, transition: { delay: 0.05 * index, duration: 0.3 } }}
                            >
                              <RadioGroupItem value={option.value} id={`sells-${index}`} />
                              <Label htmlFor={`sells-${index}`} className="cursor-pointer w-full">{option.label}</Label>
                            </motion.div>
                          ))}
                        </RadioGroup>
                        {errors.sellsTo && <p className="text-sm text-destructive">{errors.sellsTo}</p>}
                      </motion.div>
                    </CardContent>
                  </>
                )}

                {/* Step 3: Business Growth Stage */}
                {currentStep === 2 && (
                  <>
                    {!isFocusMode && (
                      <CardHeader>
                        <CardTitle>Business Growth Stage</CardTitle>
                        <CardDescription>Which best describes your business today?</CardDescription>
                      </CardHeader>
                    )}
                    <CardContent className="space-y-4">
                      <motion.div variants={fadeInUp} className="space-y-2">
                        <RadioGroup
                          value={formData.growthStage}
                          onValueChange={(value) => updateFormData("growthStage", value)}
                          className="space-y-2"
                        >
                          {[
                            { value: "just-starting", label: "Just getting started" },
                            { value: "consistent-sales", label: "Consistently generating sales" },
                            { value: "growing-steadily", label: "Growing steadily" },
                            { value: "growing-rapidly", label: "Growing rapidly" },
                            { value: "established", label: "Established and looking to scale further" },
                          ].map((option, index) => (
                            <motion.div
                              key={option.value}
                              className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-accent transition-colors"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0, transition: { delay: 0.05 * index, duration: 0.3 } }}
                            >
                              <RadioGroupItem value={option.value} id={`stage-${index}`} />
                              <Label htmlFor={`stage-${index}`} className="cursor-pointer w-full">{option.label}</Label>
                            </motion.div>
                          ))}
                        </RadioGroup>
                        {errors.growthStage && <p className="text-sm text-destructive">{errors.growthStage}</p>}
                      </motion.div>
                    </CardContent>
                  </>
                )}
                {/* Step 4: Current Challenge */}
                {currentStep === 3 && (
                  <>
                    {!isFocusMode && (
                      <CardHeader>
                        <CardTitle>Current Challenge</CardTitle>
                        <CardDescription>Help us understand what&apos;s holding you back</CardDescription>
                      </CardHeader>
                    )}
                    <CardContent className="space-y-6">
                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label>What is the biggest growth challenge your business is facing right now?</Label>
                        <RadioGroup
                          value={formData.biggestChallenge}
                          onValueChange={(value) => updateFormData("biggestChallenge", value)}
                          className="space-y-2"
                        >
                          {[
                            { value: "not-enough-leads", label: "Not generating enough leads" },
                            { value: "leads-not-converting", label: "Leads are not converting into sales" },
                            { value: "high-cac", label: "Customer acquisition costs are too high" },
                            { value: "low-conversion", label: "Website conversion rates are too low" },
                            { value: "underperforming-ads", label: "Paid advertising is underperforming" },
                            { value: "scaling-profitably", label: "Struggling to scale profitably" },
                            { value: "other", label: "Other" },
                          ].map((option, index) => (
                            <motion.div
                              key={option.value}
                              className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-accent transition-colors"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0, transition: { delay: 0.05 * index, duration: 0.3 } }}
                            >
                              <RadioGroupItem value={option.value} id={`challenge-${index}`} />
                              <Label htmlFor={`challenge-${index}`} className="cursor-pointer w-full">{option.label}</Label>
                            </motion.div>
                          ))}
                        </RadioGroup>
                        {errors.biggestChallenge && <p className="text-sm text-destructive">{errors.biggestChallenge}</p>}
                      </motion.div>

                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label>Why are you exploring marketing support right now?</Label>
                        <RadioGroup
                          value={formData.exploringReason}
                          onValueChange={(value) => updateFormData("exploringReason", value)}
                          className="space-y-2"
                        >
                          {[
                            { value: "growth-slowed", label: "Growth has slowed" },
                            { value: "revenue-plateaued", label: "Revenue has plateaued" },
                            { value: "preparing-expansion", label: "Preparing for expansion" },
                            { value: "new-offer", label: "Launching a new offer" },
                            { value: "replacing-agency", label: "Replacing an existing agency" },
                            { value: "team-capacity", label: "Internal team lacks capacity" },
                            { value: "other", label: "Other" },
                          ].map((option, index) => (
                            <motion.div
                              key={option.value}
                              className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-accent transition-colors"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0, transition: { delay: 0.05 * index, duration: 0.3 } }}
                            >
                              <RadioGroupItem value={option.value} id={`reason-${index}`} />
                              <Label htmlFor={`reason-${index}`} className="cursor-pointer w-full">{option.label}</Label>
                            </motion.div>
                          ))}
                        </RadioGroup>
                        {errors.exploringReason && <p className="text-sm text-destructive">{errors.exploringReason}</p>}
                      </motion.div>
                    </CardContent>
                  </>
                )}

                {/* Step 5: Company Information */}
                {currentStep === 4 && (
                  <>
                    {!isFocusMode && (
                      <CardHeader>
                        <CardTitle>Company Information</CardTitle>
                        <CardDescription>Tell us about your business</CardDescription>
                      </CardHeader>
                    )}
                    <CardContent className="space-y-4">
                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label htmlFor="companyName">What&apos;s your company name?</Label>
                        <Input
                          id="companyName"
                          placeholder="Your company name"
                          value={formData.companyName}
                          onChange={(e) => updateFormData("companyName", e.target.value)}
                          className="transition-all duration-300 focus:ring-1 focus:ring-primary/20 focus:border-primary"
                        />
                        {errors.companyName && <p className="text-sm text-destructive">{errors.companyName}</p>}
                      </motion.div>
                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label htmlFor="websiteUrl">What&apos;s your website URL?</Label>
                        <Input
                          id="websiteUrl"
                          type="url"
                          placeholder="https://yourwebsite.com"
                          value={formData.websiteUrl}
                          onChange={(e) => updateFormData("websiteUrl", e.target.value)}
                          className="transition-all duration-300 focus:ring-1 focus:ring-primary/20 focus:border-primary"
                        />
                      </motion.div>
                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label htmlFor="industry">Which industry are you in?</Label>
                        <Select
                          value={formData.industry}
                          onValueChange={(value) => updateFormData("industry", value)}
                        >
                          <SelectTrigger id="industry" className="transition-all duration-300 focus:ring-1 focus:ring-primary/20 focus:border-primary">
                            <SelectValue placeholder="Select an industry" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="professional-services">Professional Services</SelectItem>
                            <SelectItem value="financial-services">Financial Services</SelectItem>
                            <SelectItem value="saas-technology">SaaS / Technology</SelectItem>
                            <SelectItem value="ecommerce">E-commerce</SelectItem>
                            <SelectItem value="education">Education</SelectItem>
                            <SelectItem value="healthcare">Healthcare</SelectItem>
                            <SelectItem value="real-estate">Real Estate</SelectItem>
                            <SelectItem value="manufacturing">Manufacturing</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.industry && <p className="text-sm text-destructive">{errors.industry}</p>}
                      </motion.div>
                      {formData.industry === "other" && (
                        <motion.div variants={fadeInUp} className="space-y-2">
                          <Label htmlFor="industryOther">Please specify your industry</Label>
                          <Input
                            id="industryOther"
                            placeholder="Your industry"
                            value={formData.industryOther}
                            onChange={(e) => updateFormData("industryOther", e.target.value)}
                            className="transition-all duration-300 focus:ring-1 focus:ring-primary/20 focus:border-primary"
                          />
                        </motion.div>
                      )}
                    </CardContent>
                  </>
                )}

                {/* Step 6: Decision-Making Authority */}
                {currentStep === 5 && (
                  <>
                    {!isFocusMode && (
                      <CardHeader>
                        <CardTitle>Decision-Making Authority</CardTitle>
                        <CardDescription>Help us understand your role in the process</CardDescription>
                      </CardHeader>
                    )}
                    <CardContent className="space-y-6">
                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label>What best describes your role?</Label>
                        <RadioGroup
                          value={formData.role}
                          onValueChange={(value) => updateFormData("role", value)}
                          className="space-y-2"
                        >
                          {[
                            { value: "founder-owner", label: "Founder / Owner" },
                            { value: "ceo-md", label: "CEO / Managing Director" },
                            { value: "marketing-director", label: "Marketing Director" },
                            { value: "marketing-manager", label: "Marketing Manager" },
                            { value: "sales-director", label: "Sales Director" },
                            { value: "operations-lead", label: "Operations Lead" },
                            { value: "other", label: "Other" },
                          ].map((option, index) => (
                            <motion.div
                              key={option.value}
                              className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-accent transition-colors"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0, transition: { delay: 0.05 * index, duration: 0.3 } }}
                            >
                              <RadioGroupItem value={option.value} id={`role-${index}`} />
                              <Label htmlFor={`role-${index}`} className="cursor-pointer w-full">{option.label}</Label>
                            </motion.div>
                          ))}
                        </RadioGroup>
                        {errors.role && <p className="text-sm text-destructive">{errors.role}</p>}
                      </motion.div>

                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label>Are you involved in approving marketing investments?</Label>
                        <RadioGroup
                          value={formData.decisionAuthority}
                          onValueChange={(value) => updateFormData("decisionAuthority", value)}
                          className="space-y-2"
                        >
                          {[
                            { value: "final-decision", label: "I am the final decision-maker" },
                            { value: "shared-decision", label: "I share decision-making responsibility" },
                            { value: "influence-only", label: "I influence decisions but do not approve them" },
                            { value: "researching", label: "I am researching on behalf of someone else" },
                          ].map((option, index) => (
                            <motion.div
                              key={option.value}
                              className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-accent transition-colors"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0, transition: { delay: 0.05 * index, duration: 0.3 } }}
                            >
                              <RadioGroupItem value={option.value} id={`authority-${index}`} />
                              <Label htmlFor={`authority-${index}`} className="cursor-pointer w-full">{option.label}</Label>
                            </motion.div>
                          ))}
                        </RadioGroup>
                        {errors.decisionAuthority && <p className="text-sm text-destructive">{errors.decisionAuthority}</p>}
                      </motion.div>
                    </CardContent>
                  </>
                )}

                {/* Step 7: Revenue & Investment */}
                {currentStep === 6 && (
                  <>
                    {!isFocusMode && (
                      <CardHeader>
                        <CardTitle>Revenue &amp; Investment</CardTitle>
                        <CardDescription>Help us understand your current position</CardDescription>
                      </CardHeader>
                    )}
                    <CardContent className="space-y-6">
                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label htmlFor="monthlyRevenue">What is your current monthly revenue range?</Label>
                        <Select
                          value={formData.monthlyRevenue}
                          onValueChange={(value) => updateFormData("monthlyRevenue", value)}
                        >
                          <SelectTrigger id="monthlyRevenue" className="transition-all duration-300 focus:ring-1 focus:ring-primary/20 focus:border-primary">
                            <SelectValue placeholder="Select revenue range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0-250k">R0 – R250K</SelectItem>
                            <SelectItem value="250k-500k">R250K – R500K</SelectItem>
                            <SelectItem value="500k-1m">R500K – R1M</SelectItem>
                            <SelectItem value="1m-2m">R1M – R2M</SelectItem>
                            <SelectItem value="2m-10m">R2M – R10M</SelectItem>
                            <SelectItem value="10m+">R10M+</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.monthlyRevenue && <p className="text-sm text-destructive">{errors.monthlyRevenue}</p>}
                      </motion.div>

                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label htmlFor="monthlyAdSpend">What is your current monthly advertising investment?</Label>
                        <Select
                          value={formData.monthlyAdSpend}
                          onValueChange={(value) => updateFormData("monthlyAdSpend", value)}
                        >
                          <SelectTrigger id="monthlyAdSpend" className="transition-all duration-300 focus:ring-1 focus:ring-primary/20 focus:border-primary">
                            <SelectValue placeholder="Select ad spend range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">R0</SelectItem>
                            <SelectItem value="under-25k">Less than R25K</SelectItem>
                            <SelectItem value="25k-75k">R25K – R75K</SelectItem>
                            <SelectItem value="75k-125k">R75K – R125K</SelectItem>
                            <SelectItem value="125k-250k">R125K – R250K</SelectItem>
                            <SelectItem value="250k-500k">R250K – R500K</SelectItem>
                            <SelectItem value="500k+">R500K+</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.monthlyAdSpend && <p className="text-sm text-destructive">{errors.monthlyAdSpend}</p>}
                      </motion.div>

                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label>Do you have a budget allocated for growth initiatives over the next 90 days?</Label>
                        <RadioGroup
                          value={formData.budgetAllocated}
                          onValueChange={(value) => updateFormData("budgetAllocated", value)}
                          className="space-y-2"
                        >
                          {[
                            { value: "yes", label: "Yes" },
                            { value: "no", label: "No" },
                            { value: "still-deciding", label: "Still deciding" },
                          ].map((option, index) => (
                            <motion.div
                              key={option.value}
                              className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-accent transition-colors"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0, transition: { delay: 0.05 * index, duration: 0.3 } }}
                            >
                              <RadioGroupItem value={option.value} id={`budget-${index}`} />
                              <Label htmlFor={`budget-${index}`} className="cursor-pointer w-full">{option.label}</Label>
                            </motion.div>
                          ))}
                        </RadioGroup>
                        {errors.budgetAllocated && <p className="text-sm text-destructive">{errors.budgetAllocated}</p>}
                      </motion.div>
                    </CardContent>
                  </>
                )}

                {/* Step 8: Readiness */}
                {currentStep === 7 && (
                  <>
                    {!isFocusMode && (
                      <CardHeader>
                        <CardTitle>Readiness</CardTitle>
                        <CardDescription>Help us understand your urgency</CardDescription>
                      </CardHeader>
                    )}
                    <CardContent className="space-y-6">
                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label>How soon are you looking to implement a growth strategy?</Label>
                        <RadioGroup
                          value={formData.implementationTimeline}
                          onValueChange={(value) => updateFormData("implementationTimeline", value)}
                          className="space-y-2"
                        >
                          {[
                            { value: "immediately", label: "Immediately" },
                            { value: "within-30-days", label: "Within 30 days" },
                            { value: "within-90-days", label: "Within 90 days" },
                            { value: "within-6-months", label: "Within 6 months" },
                            { value: "just-exploring", label: "Just exploring options" },
                          ].map((option, index) => (
                            <motion.div
                              key={option.value}
                              className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-accent transition-colors"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0, transition: { delay: 0.05 * index, duration: 0.3 } }}
                            >
                              <RadioGroupItem value={option.value} id={`timeline-${index}`} />
                              <Label htmlFor={`timeline-${index}`} className="cursor-pointer w-full">{option.label}</Label>
                            </motion.div>
                          ))}
                        </RadioGroup>
                        {errors.implementationTimeline && <p className="text-sm text-destructive">{errors.implementationTimeline}</p>}
                      </motion.div>

                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label>If we identify clear opportunities to improve your results, how likely are you to take action?</Label>
                        <RadioGroup
                          value={formData.actionLikelihood}
                          onValueChange={(value) => updateFormData("actionLikelihood", value)}
                          className="space-y-2"
                        >
                          {[
                            { value: "very-likely", label: "Very likely" },
                            { value: "likely", label: "Likely" },
                            { value: "unsure", label: "Unsure" },
                            { value: "unlikely", label: "Unlikely" },
                          ].map((option, index) => (
                            <motion.div
                              key={option.value}
                              className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-accent transition-colors"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0, transition: { delay: 0.05 * index, duration: 0.3 } }}
                            >
                              <RadioGroupItem value={option.value} id={`likelihood-${index}`} />
                              <Label htmlFor={`likelihood-${index}`} className="cursor-pointer w-full">{option.label}</Label>
                            </motion.div>
                          ))}
                        </RadioGroup>
                        {errors.actionLikelihood && <p className="text-sm text-destructive">{errors.actionLikelihood}</p>}
                      </motion.div>
                    </CardContent>
                  </>
                )}

                {/* Step 9: Additional Context */}
                {currentStep === 8 && (
                  <>
                    {!isFocusMode && (
                      <CardHeader>
                        <CardTitle>Additional Context</CardTitle>
                        <CardDescription>Is there anything else you&apos;d like us to know before the call?</CardDescription>
                      </CardHeader>
                    )}
                    <CardContent className="space-y-4">
                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Textarea
                          id="additionalContext"
                          placeholder="Share anything that might help us prepare for your call..."
                          value={formData.additionalContext}
                          onChange={(e) => updateFormData("additionalContext", e.target.value)}
                          className="min-h-40 transition-all duration-300 focus:ring-1 focus:ring-primary/20 focus:border-primary"
                        />
                      </motion.div>
                    </CardContent>
                  </>
                )}

                {/* Step 10: Contact Information */}
                {currentStep === 9 && (
                  <>
                    {!isFocusMode && (
                      <CardHeader>
                        <CardTitle>Contact Information</CardTitle>
                        <CardDescription>Please provide your contact details</CardDescription>
                      </CardHeader>
                    )}
                    <CardContent className="space-y-4">
                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          placeholder="Your full name"
                          value={formData.name}
                          onChange={(e) => updateFormData("name", e.target.value)}
                          className="transition-all duration-300 focus:ring-1 focus:ring-primary/20 focus:border-primary"
                        />
                        {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                      </motion.div>
                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          value={formData.email}
                          onChange={(e) => updateFormData("email", e.target.value)}
                          className="transition-all duration-300 focus:ring-1 focus:ring-primary/20 focus:border-primary"
                        />
                        {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                      </motion.div>
                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="Your phone number"
                          value={formData.phone}
                          onChange={(e) => updateFormData("phone", e.target.value)}
                          className="transition-all duration-300 focus:ring-1 focus:ring-primary/20 focus:border-primary"
                        />
                        {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
                      </motion.div>
                    </CardContent>
                  </>
                )}

                {/* Step 11: Meeting Preference */}
                {currentStep === 10 && (
                  <>
                    {!isFocusMode && (
                      <CardHeader>
                        <CardTitle>Meeting Preference</CardTitle>
                        <CardDescription>How would you prefer to meet?</CardDescription>
                      </CardHeader>
                    )}
                    <CardContent className="space-y-4">
                      <motion.div variants={fadeInUp} className="space-y-2">
                        <RadioGroup
                          value={formData.meetingPreference}
                          onValueChange={(value) => updateFormData("meetingPreference", value)}
                          className="space-y-2"
                        >
                          {[
                            { value: "online", label: "Online Meeting" },
                            { value: "in-person", label: "In-Person (Pretoria Office)" },
                          ].map((option, index) => (
                            <motion.div
                              key={option.value}
                              className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-accent transition-colors"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0, transition: { delay: 0.05 * index, duration: 0.3 } }}
                            >
                              <RadioGroupItem value={option.value} id={`meeting-${index}`} />
                              <Label htmlFor={`meeting-${index}`} className="cursor-pointer w-full">{option.label}</Label>
                            </motion.div>
                          ))}
                        </RadioGroup>
                        {errors.meetingPreference && <p className="text-sm text-destructive">{errors.meetingPreference}</p>}
                      </motion.div>
                    </CardContent>
                  </>
                )}

              </motion.div>
            </AnimatePresence>

            <CardFooter className="flex justify-between pt-6 pb-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className="flex items-center gap-1 transition-all duration-300 rounded-2xl"
                >
                  <ChevronLeft className="h-4 w-4" /> Back
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  type="button"
                  onClick={
                    currentStep === steps.length - 1 ? handleSubmit : nextStep
                  }
                  disabled={isSubmitting}
                  className={cn(
                    "flex items-center gap-1 transition-all duration-300 rounded-2xl",
                    currentStep === steps.length - 1 ? "" : "",
                  )}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Submitting...
                    </>
                  ) : (
                    <>
                      {currentStep === steps.length - 1 ? "Submit" : "Next"}
                      {currentStep === steps.length - 1 ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </>
                  )}
                </Button>
              </motion.div>
            </CardFooter>
          </div>
        </Card>
    </motion.div>
  );
};

export default OnboardingForm;
