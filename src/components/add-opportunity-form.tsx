"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { createOpportunity } from "@/app/actions/opportunity";

const formSchema = z.object({
    opportunityCode: z.string().min(1, { message: "Opportunity code is required." }),
    opportunityName: z.string().min(1, { message: "Opportunity name is required." }),
    opportunityStatus: z.string().min(1, { message: "Status is required." }),
    opportunityDescription: z.string().optional(),
    customerInfo: z.string().min(1, { message: "Customer info is required." }),
    preSalesOwner: z.string().min(1, { message: "Pre-sales owner is required." }),
    opportunityAmount: z.string().min(1, { message: "Amount is required." }),
    supportStartDate: z.string().min(1, { message: "Support start date is required." }),
    supportEndDate: z.string().min(1, { message: "Support end date is required." }),
    needTravel: z.boolean().default(false),
    travelDays: z.string().optional(),
    travelLocation: z.string().optional(),
});

interface AddOpportunityFormProps {
    onSuccess?: () => void;
}

export function AddOpportunityForm({ onSuccess }: AddOpportunityFormProps) {
    const { toast } = useToast();
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            opportunityCode: "",
            opportunityName: "",
            opportunityStatus: "",
            opportunityDescription: "",
            customerInfo: "",
            preSalesOwner: "",
            opportunityAmount: "",
            supportStartDate: "",
            supportEndDate: "",
            needTravel: false,
            travelDays: "",
            travelLocation: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        startTransition(async () => {
            const formData = new FormData();
            formData.append('opportunityCode', values.opportunityCode);
            formData.append('opportunityName', values.opportunityName);
            formData.append('opportunityStatus', values.opportunityStatus);
            formData.append('customerInfo', values.customerInfo);
            formData.append('preSalesOwner', values.preSalesOwner);
            formData.append('opportunityAmount', values.opportunityAmount);
            formData.append('supportStartDate', values.supportStartDate);
            formData.append('supportEndDate', values.supportEndDate);
            formData.append('needTravel', String(values.needTravel));

            if (values.opportunityDescription) {
                formData.append('opportunityDescription', values.opportunityDescription);
            }
            if (values.travelDays) {
                formData.append('travelDays', values.travelDays);
            }
            if (values.travelLocation) {
                formData.append('travelLocation', values.travelLocation);
            }

            const result = await createOpportunity(formData);

            if (result?.error) {
                toast({
                    title: "Failed to Create Opportunity",
                    description: result.error,
                    variant: "destructive",
                });
            } else {
                toast({
                    title: "Success",
                    description: "Opportunity created successfully!",
                });
                form.reset();
                onSuccess?.();
            }
        });
    }

    return (
        <Card className="w-full border-none shadow-xl">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">New Opportunity</CardTitle>
                <CardDescription>Add a new opportunity to your pipeline</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="opportunityCode"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Opportunity Code *</FormLabel>
                                        <FormControl>
                                            <Input placeholder="OPP-001" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="opportunityStatus"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Status *</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Active" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="opportunityName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Opportunity Name *</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enterprise Solution Project" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="customerInfo"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Customer Info *</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Acme Corporation" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="preSalesOwner"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Pre-sales Owner *</FormLabel>
                                    <FormControl>
                                        <Input placeholder="John Doe" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="opportunityAmount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Amount (USD)</FormLabel>
                                    <FormControl>
                                        <Input type="number" step="0.01" placeholder="50000.00" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="supportStartDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Support Start Date</FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="supportEndDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Support End Date</FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="needTravel"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>
                                            Travel Required
                                        </FormLabel>
                                    </div>
                                </FormItem>
                            )}
                        />

                        {form.watch("needTravel") && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="travelDays"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Travel Days</FormLabel>
                                            <FormControl>
                                                <Input type="number" placeholder="5" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="travelLocation"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Travel Destination</FormLabel>
                                            <FormControl>
                                                <Input placeholder="New York, USA" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        )}

                        <Button type="submit" className="w-full !mt-8" size="lg" disabled={isPending}>
                            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Create Opportunity
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
