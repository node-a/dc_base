'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { AddOpportunityForm } from '@/components/add-opportunity-form';
import { logout } from '@/app/actions/auth';
import { deleteOpportunity } from '@/app/actions/opportunity';
import { LogOut, Plus, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Opportunity {
    opportunity_code: string;
    opportunity_name: string;
    opportunity_status: string;
    customer_info: string;
    pre_sales_owner: string;
    opportunity_amount?: number;
    support_start_date?: string;
    support_end_date?: string;
}

interface Profile {
    first_name?: string;
    last_name?: string;
    email?: string;
}

export default function DashboardPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [user, setUser] = useState<any>(null);
    const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [opportunityToDelete, setOpportunityToDelete] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        async function loadData() {
            const supabase = createClient();

            // Check if user is logged in
            const { data: { user: currentUser }, error: userError } = await supabase.auth.getUser();

            if (userError || !currentUser) {
                router.push('/');
                return;
            }

            setUser(currentUser);

            // Fetch opportunities
            const { data: opps, error: oppsError } = await supabase
                .from('opportunity')
                .select('*')
                .eq('user_id', currentUser.id)
                .order('created_at', { ascending: false });

            if (oppsError) {
                setError(oppsError.message);
            } else {
                setOpportunities(opps || []);
            }

            // Fetch user profile
            const { data: profileData } = await supabase
                .from('profiles')
                .select('first_name, last_name, email')
                .eq('id', currentUser.id)
                .single();

            setProfile(profileData);
            setLoading(false);
        }

        loadData();
    }, [router]);

    const handleOpportunityCreated = async () => {
        setDialogOpen(false);

        // Refresh opportunities
        const supabase = createClient();
        const { data: opps } = await supabase
            .from('opportunity')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

        if (opps) {
            setOpportunities(opps);
        }
    };

    const handleDeleteClick = (opportunityCode: string) => {
        setOpportunityToDelete(opportunityCode);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!opportunityToDelete) return;

        setIsDeleting(true);
        const result = await deleteOpportunity(opportunityToDelete);

        if (result?.error) {
            toast({
                title: 'Failed to Delete Opportunity',
                description: result.error,
                variant: 'destructive',
            });
        } else {
            toast({
                title: 'Success',
                description: 'Opportunity deleted successfully!',
            });

            // Refresh opportunities
            const supabase = createClient();
            const { data: opps } = await supabase
                .from('opportunity')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (opps) {
                setOpportunities(opps);
            }
        }

        setIsDeleting(false);
        setDeleteDialogOpen(false);
        setOpportunityToDelete(null);
    };

    if (loading) {
        return (
            <main className="min-h-screen bg-background p-4 md:p-8 flex items-center justify-center">
                <div className="text-muted-foreground">Loading...</div>
            </main>
        );
    }

    const displayName = profile?.first_name
        ? `${profile.first_name} ${profile.last_name || ''}`.trim()
        : profile?.email || user?.email;

    return (
        <main className="min-h-screen bg-background p-4 md:p-8 animate-in fade-in-50">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Logo />
                        <div>
                            <h1 className="text-3xl font-bold">Dashboard</h1>
                            <p className="text-muted-foreground">Welcome back, {displayName}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                            <DialogTrigger asChild>
                                <Button size="sm" className="shadow-lg">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Opportunity
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                                <AddOpportunityForm onSuccess={handleOpportunityCreated} />
                            </DialogContent>
                        </Dialog>
                        <form action={logout}>
                            <Button variant="outline" size="sm" type="submit">
                                <LogOut className="mr-2 h-4 w-4" />
                                Logout
                            </Button>
                        </form>
                    </div>
                </div>

                {/* Opportunities Table */}
                <Card className="border-none shadow-xl">
                    <CardHeader>
                        <CardTitle className="text-2xl">Your Opportunities</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {error ? (
                            <div className="text-destructive p-4 text-center">
                                Error loading opportunities: {error}
                            </div>
                        ) : opportunities.length === 0 ? (
                            <div className="text-muted-foreground p-8 text-center">
                                No opportunities found. Start by creating your first opportunity!
                            </div>
                        ) : (
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Code</TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Customer</TableHead>
                                            <TableHead>Owner</TableHead>
                                            <TableHead className="text-right">Amount</TableHead>
                                            <TableHead>Support Period</TableHead>
                                            <TableHead className="w-[50px]"></TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {opportunities.map((opp) => (
                                            <TableRow key={opp.opportunity_code}>
                                                <TableCell className="font-medium">{opp.opportunity_code}</TableCell>
                                                <TableCell>{opp.opportunity_name}</TableCell>
                                                <TableCell>
                                                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-primary/10 text-primary">
                                                        {opp.opportunity_status}
                                                    </span>
                                                </TableCell>
                                                <TableCell>{opp.customer_info}</TableCell>
                                                <TableCell>{opp.pre_sales_owner}</TableCell>
                                                <TableCell className="text-right">
                                                    {opp.opportunity_amount
                                                        ? new Intl.NumberFormat('en-US', {
                                                            style: 'currency',
                                                            currency: 'USD'
                                                        }).format(opp.opportunity_amount)
                                                        : '-'}
                                                </TableCell>
                                                <TableCell>
                                                    {opp.support_start_date && opp.support_end_date
                                                        ? `${new Date(opp.support_start_date).toLocaleDateString()} - ${new Date(opp.support_end_date).toLocaleDateString()}`
                                                        : '-'}
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => handleDeleteClick(opp.opportunity_code)}
                                                        className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Delete Confirmation Dialog */}
                <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the opportunity
                                <span className="font-semibold"> {opportunityToDelete}</span>.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={handleDeleteConfirm}
                                disabled={isDeleting}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                                {isDeleting ? 'Deleting...' : 'Delete'}
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </main>
    );
}
