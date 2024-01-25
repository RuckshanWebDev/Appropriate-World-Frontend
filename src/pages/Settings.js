import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { useCancelSubscriptionsMutation, useCreateCustomerMutation, useCreatePortalSessionMutation, useGetSubscriptionsMutation, useInvoiceHistoryMutation } from '../features/paymentApi'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import LoaderContainer from '../components/LoaderContainer'
import { useGetProfileQuery, useLazyGetProfileQuery, useUpdateProfileMutation } from '../features/profileApi'
import { setProfileId } from '../features/localSlice'
// import '../ @radix-ui/themes/styles.css';
// import url('../../ node_modules/@radix-ui/themes/styles.css');
import './../../node_modules/@radix-ui/themes/styles.css'
import { AlertDialog, Avatar, Badge, Box, Button, Card, Flex, Heading, Separator, Table, Text, TextField, Theme } from '@radix-ui/themes'
import getPackageName from '../utils/getPackageName'


function Settings() {

    const { user } = useSelector(state => state.local)
    const [data, setDate] = useState()
    const dispatch = useDispatch()

    const [profileUpdate, profileData] = useUpdateProfileMutation()
    const [getProfileData, dataProfile] = useLazyGetProfileQuery()
    const [getSubscriptions, getSubscriptionsData] = useGetSubscriptionsMutation()
    const [createCustomer, createCustomerData] = useCreateCustomerMutation()
    const [cancelSubscription] = useCancelSubscriptionsMutation()
    const [portalSession] = useCreatePortalSessionMutation()
    const [getInvoice, invoiceData] = useInvoiceHistoryMutation()

    const cancelSubscriptionHandler = async (id) => {
        try {
            const responce = await cancelSubscription({ subscription: id }).unwrap()
            window.location.reload()

        } catch (error) {
            console.log(error);

        }
    }

    const upgradeHandler = async (subscription) => {
        try {
            const responce = await portalSession({ customer: user.profile.customerId, subscription })
            console.log(responce);
            console.log(responce.data.data.url);
            window.location.href = responce.data.data.url
        } catch (error) {
            console.log(error);
        }
    }

    const apiCall = async () => {

        try {
            if (user && user.profile.customerId) {

                const responce = await getSubscriptions({ customerId: user.profile.customerId }).unwrap()
                console.log('SUBSCRIPTION', responce);

            } else if (user && !user.profile.customerId) {

                const responce = await createCustomer({ profileId: user.profileId }).unwrap()

                const responceSubscription = await getSubscriptions({ customerId: responce.data }).unwrap()

                const profile = await getProfileData().unwrap()
                dispatch(setProfileId(profile.data[0]))
                console.log(responce, responceSubscription, profile);

            }

        } catch (error) {

            console.log(error);

        }


    }

    const invoices = () => {
        try {
            getInvoice({ customer: user.profile.customerId })
        } catch (error) {
            console.log(error);
        }
    }


    const updateProfileWithSubsciption = () => {

        // GET PACKAGS NAME AND ADD TO THE PROFILE
        if (getSubscriptionsData.data?.data.data[0]?.items.total_count) {

            // CHECKING THE ACTIVE PACKAGES
            if (getSubscriptionsData.data.data.data[0].status === 'active') {

                if (getPackageName(getSubscriptionsData.data.data.data[0].plan.id) === 'EMERALD') {

                    if (user.profile.accountType !== 'EMERALD') {
                        profileUpdate({ isPremium: true, accountType: 'EMERALD' })
                    }

                } else if (getPackageName(getSubscriptionsData.data.data.data[0].plan.id) === 'ONYX') {

                    if (user.profile.accountType !== 'ONYX') {
                        console.log('🎉🎉🎉');
                        profileUpdate({ isPremium: true, accountType: 'ONYX' })
                    }

                }

            } else {

                // FREE PACKAGE
                if (user.profile.isPremium) {
                    profileUpdate({ isPremium: false, accountType: 'basic' })
                }

            }

        } else {

            //    FREE PACKAGE
            if (user.profile.isPremium) {
                profileUpdate({ isPremium: false, accountType: 'basic' })
            }

        }
    }

    useEffect(() => {

        apiCall()
        invoices()
        updateProfileWithSubsciption()

    }, [])

    return (
        <Layout loader={getSubscriptionsData.isLoading || createCustomerData.isLoading || invoiceData.isLoading} >
            <div className='container' style={{ position: 'relative' }} >

                {getSubscriptionsData.isSuccess &&
                    <div className="container">

                        <Theme>
                            <div  >
                                <Heading mt='5'>Account Credentials</Heading>

                                <Flex direction="column" gap="3" mt='3' mb='8' >
                                    <label>
                                        <Text as="div" size="2" mb="1" weight="bold">
                                            Name
                                        </Text>
                                        <TextField.Input
                                            value={user.profile.name}
                                            disabled
                                            defaultValue="Freja Johnsen"
                                            placeholder="Enter your full name"
                                        />
                                    </label>
                                    <label>
                                        <Text as="div" size="2" mb="1" weight="bold">
                                            Email
                                        </Text>
                                        <TextField.Input
                                            value={user.email}
                                            disabled
                                            defaultValue="freja@example.com"
                                            placeholder="Enter your email"
                                        />
                                    </label>
                                </Flex>
                            </div>

                            <Separator my="3" size="4" />


                            <Heading my='8'>Subscriptions</Heading>

                            <Flex gap={'4'} wrap={'wrap'} justify={'normal'} >
                                {
                                    getSubscriptionsData.data.data.data.length ?
                                        getSubscriptionsData.data.data.data.map(item => {

                                            const created = `${new Date(item.current_period_start * 1000).getDate()}/${new Date(item.current_period_start * 1000).getMonth() + 1}/${new Date(item.current_period_start * 1000).getFullYear()}`
                                            const endson = `${new Date(item.current_period_end * 1000).getDate()}/${new Date(item.current_period_end * 1000).getMonth() + 1}/${new Date(item.current_period_end * 1000).getFullYear()}`

                                            return (
                                                <>
                                                    <Card className='card-1-3' >
                                                        <Flex direction={'column'} align={'start'} >
                                                            <Badge color={item.status === 'active' ? 'green' : 'red'} style={{ alignSelf: 'flex-end', position: 'absolute', top: '15px', right: '15px' }} >{item.status} </Badge>
                                                            <Avatar
                                                                size={'7'}
                                                                src={getPackageName(item.plan.id) === 'EMERALD' ? '/card/emerald_icon.png' : '/card/onyx_icon.png'}
                                                            />
                                                            <Text as="div" size="8" weight="bold">
                                                                {getPackageName(item.plan.id)}
                                                            </Text>
                                                            <Text as="div" size="4" color="gray">
                                                                {item.items.data[0].price.unit_amount}
                                                            </Text>

                                                            <Flex style={{ alignSelf: 'center' }} my={'5'} align={'center'} justify={'center'} gap={'5'} >
                                                                <Box style={{
                                                                    backgroundColor: 'transparent', padding: '5px', borderRadius:
                                                                        '5px'
                                                                }} >
                                                                    <Flex direction={'column'} justify={'center'} align={'center'}  >
                                                                        <Text style={{ color: '#fff' }} >Started At</Text>
                                                                        <Text color='primary' weight='bold' size='5' >{created}</Text>
                                                                    </Flex>
                                                                </Box>
                                                                <Box style={{
                                                                    backgroundColor: 'transparent', padding: '5px', borderRadius:
                                                                        '5px'
                                                                }} >
                                                                    <Flex direction={'column'} justify={'center'} align={'center'}>
                                                                        <Text style={{ color: '#fff' }}>{item.canceled_at ? "Canceled On" : 'Ends On'}</Text>
                                                                        <Text color='red' weight='bold' size='5' >{endson}</Text>
                                                                    </Flex>
                                                                </Box>
                                                            </Flex>

                                                            <Flex style={{ alignSelf: 'normal' }} justify={'between'} >
                                                                <AlertDialog.Root>
                                                                    <AlertDialog.Trigger>
                                                                        <Button color="crimson" variant="soft" size="3" disabled={item.canceled_at} >Cancel</Button>
                                                                    </AlertDialog.Trigger>
                                                                    <AlertDialog.Content style={{ maxWidth: 450 }}>
                                                                        <AlertDialog.Title>Revoke access</AlertDialog.Title>
                                                                        <AlertDialog.Description size="2">
                                                                            Are you sure? Do you need to cancel the subscription?
                                                                        </AlertDialog.Description>

                                                                        <Flex gap="3" mt="4" justify="end">
                                                                            <AlertDialog.Cancel >
                                                                                <Button variant="soft" color="gray">
                                                                                    exit
                                                                                </Button>
                                                                            </AlertDialog.Cancel>
                                                                            <AlertDialog.Action>
                                                                                <Button variant="solid" color="red" onClick={() => cancelSubscriptionHandler(item.id)}>
                                                                                    Cancel Subscription
                                                                                </Button>
                                                                            </AlertDialog.Action>
                                                                        </Flex>
                                                                    </AlertDialog.Content>
                                                                </AlertDialog.Root>
                                                                <Button disabled={item.canceled_at} onClick={() => upgradeHandler(item.id)} color="indigo" variant="soft" size="3">
                                                                    Upgrade
                                                                </Button>
                                                            </Flex>

                                                        </Flex>
                                                    </Card>
                                                </>
                                            )
                                        })
                                        :
                                        <Text>No Subsctiption yet</Text>

                                }
                            </Flex>

                            <Heading my='8'>Billing History</Heading>

                            <Table.Root mb={'8'}>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.ColumnHeaderCell>Date</Table.ColumnHeaderCell>
                                        <Table.ColumnHeaderCell>Package</Table.ColumnHeaderCell>
                                        <Table.ColumnHeaderCell>Action Type</Table.ColumnHeaderCell>
                                        <Table.ColumnHeaderCell>Amount</Table.ColumnHeaderCell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    {invoiceData.data?.data?.data.length ?
                                        invoiceData.data.data.data.map(item => {
                                            return (
                                                <Table.Row>
                                                    <Table.RowHeaderCell>{`${new Date(item.created * 1000).getDate()} / ${new Date(item.created * 1000).getMonth()}  / ${new Date(item.created * 1000).getFullYear()}`}</Table.RowHeaderCell>
                                                    <Table.Cell>{getPackageName(item.lines.data[0].plan.id)}</Table.Cell>
                                                    <Table.Cell style={{ textTransform: 'capitalize' }} >{item.billing_reason.replace('_', ' ')}</Table.Cell>
                                                    <Table.Cell>$ {(item.amount_paid * 0.01).toFixed(2)} </Table.Cell>
                                                </Table.Row>
                                            )
                                        })
                                        :
                                        ''

                                    }


                                </Table.Body>
                            </Table.Root>

                        </Theme>

                    </div>
                }
            </div>
        </Layout>
    )
}

export default Settings
