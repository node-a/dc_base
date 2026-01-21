'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function createOpportunity(formData: FormData) {
    const supabase = await createClient()

    // Check if user is authenticated
    const { data: { user }, error: userError } = await supabase.auth.getUser()

    if (userError || !user) {
        return { error: 'You must be logged in to create an opportunity' }
    }

    // Extract form data
    const opportunityCode = formData.get('opportunityCode') as string
    const opportunityName = formData.get('opportunityName') as string
    const opportunityStatus = formData.get('opportunityStatus') as string
    const customerInfo = formData.get('customerInfo') as string
    const preSalesOwner = formData.get('preSalesOwner') as string
    const opportunityAmount = formData.get('opportunityAmount') as string
    const supportStartDate = formData.get('supportStartDate') as string
    const supportEndDate = formData.get('supportEndDate') as string
    const needTravel = formData.get('needTravel') as string
    const travelDays = formData.get('travelDays') as string
    const travelLocation = formData.get('travelLocation') as string
    const opportunityDescription = formData.get('opportunityDescription') as string

    // Validate required fields
    if (!opportunityCode || !opportunityName || !opportunityStatus || !customerInfo || !preSalesOwner) {
        return { error: 'Please fill in all required fields' }
    }

    // Prepare data for insertion
    const opportunityData: any = {
        user_id: user.id,
        opportunity_code: opportunityCode,
        opportunity_name: opportunityName,
        opportunity_status: opportunityStatus,
        customer_info: customerInfo,
        pre_sales_owner: preSalesOwner,
        need_travel: needTravel === 'true',
    }

    // Add optional fields if provided
    if (opportunityDescription) {
        opportunityData.opportunity_description = opportunityDescription
    }

    if (opportunityAmount) {
        const amount = parseFloat(opportunityAmount)
        if (!isNaN(amount)) {
            opportunityData.opportunity_amount = amount
        }
    }

    if (supportStartDate) {
        opportunityData.support_start_date = supportStartDate
    }

    if (supportEndDate) {
        opportunityData.support_end_date = supportEndDate
    }

    if (travelDays) {
        const days = parseInt(travelDays)
        if (!isNaN(days)) {
            opportunityData.travel_days = days
        }
    }

    if (travelLocation) {
        opportunityData.travel_location = travelLocation
    }

    // Insert the opportunity
    const { error: insertError } = await supabase
        .from('opportunity')
        .insert(opportunityData)

    if (insertError) {
        console.error('Opportunity creation error:', insertError.message)
        return { error: insertError.message }
    }

    // Revalidate the dashboard page to show the new opportunity
    revalidatePath('/dashboard')

    return { success: true }
}

export async function deleteOpportunity(opportunityCode: string) {
    const supabase = await createClient()

    // Check if user is authenticated
    const { data: { user }, error: userError } = await supabase.auth.getUser()

    if (userError || !user) {
        return { error: 'You must be logged in to delete an opportunity' }
    }

    if (!opportunityCode) {
        return { error: 'Opportunity code is required' }
    }

    // Delete the opportunity (RLS policy ensures user can only delete their own)
    const { error: deleteError } = await supabase
        .from('opportunity')
        .delete()
        .eq('opportunity_code', opportunityCode)
        .eq('user_id', user.id)

    if (deleteError) {
        console.error('Opportunity deletion error:', deleteError.message)
        return { error: deleteError.message }
    }

    // Revalidate the dashboard page to reflect the deletion
    revalidatePath('/dashboard')

    return { success: true }
}
