import { useState, useEffect } from 'react';
import React from 'react'
import { Button, Card, CardActions, CardContent, Stack, TextField, Radio, DialogContent, DialogContentText, FormControlLabel, FormHelperText, FormGroup, Checkbox, Select, MenuItem } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import axios from 'axios';
import Switch from '@mui/material/Switch';
import RadioGroup from '@mui/material/RadioGroup';
import { baseURL } from 'src/utils/api';
import { useAuth } from 'src/AuthContext';



const label = { inputProps: { 'aria-label': 'Switch demo' } };
export default function ViewSlefShakthiForm({ editSession, setEditsession, Trainingdata, changeState, participantdata, cvalue, setShowForm, participantData }) {
    const { apikey } = useAuth();
    const participantId = participantData?.participant_id ? parseInt(participantData?.participant_id, 10) : null; // Ensure participantId is valid or null
    const [sendData, setSendData] = useState(
        {
            "firstName": "",
            "caste_name":"",
            "id": participantId,
            "taluk": "",
            "migration_profile": "",
            "household_migration_last_year": "",
            "migrant_sends_remittance": "",
            "financial_literacy": "",
            "liabilities_or_assets": [],
            "bookkeeping_entry": [],
            "loan_type": [],
            "annual_interest_rate": null,
            "interest_payment_due": null,
            "profit_made": null,
            "personal_account": "",
            "has_personal_account": "",
            "bank_account_usage_frequency": [],
            "money_decision_maker": [],
            "monthly_expense_plan": "",
            "monthly_expense_amount": null,
            "maintain_expense_record": "",
            "individual_savings": null,
            "monthly_savings_individual": null,
            "annual_savings_household": null,
            "confident_spend_savings": "",
            "loans": "",
            "loan_taken_by": [],
            "amount_borrowed": null,
            "purpose_of_loan": [],
            "source": [],
            "rate_of_interest": null,
            "expenses_exceed_income_last_year": "",
            "income_loss_duration": [],
            "goals": "",
            "financial_goals_set": "",
            "short_term_goal": "",
            "long_term_goal": "",
            "enterprise": "",
            "family_business": "",
            "want_to_start_enterprise": "",
            "enterprise_type": [],
            "num_employees_paid": null,
            "individual_involvement_nature": [],
            "enterprise_monthly_income": null,
            "enterprise_is_profitable": "",
            "monthly_profit": null,
            "decision_making": "",
            "decision_say": [],
            "menstrual_hygiene_env": "",
            "env_friendly_practices": [],
            "menstrual_product_used": [],
            "menstrual_disposal_method": [],
            "cooking_fuel_type": [],
            // "womens_occupation": "",
            // "monthly_women_income": 5000.00,
            // "source_of_this_income": "",
            // "secondary_occupation_of_the_household": "",
            // "primary_occupation_of_household": ""
            "withdraw_savings_a": "",
            "reduce_expenses_a": "",
            "asset_sale_a": "",
            "overtime_hours_a": "",
            "missed_payments_a": "",
            "borrowed_from_others_a": "",
            "borrowed_from_lender_a": "",
            "borrowed_from_shg_a": "",
            "pawned_item_a": "",
            "bank_loan_a": "",
            "children_education_b": "",
            "health_services_access_b": "",
            "taking_credit_b": "",
            "saving_money_b": "",
            "asset_purchase_b": "",
            "daily_expenditure_b": "",
            "operational_management_b": "",
            "input_procuring_b": "",
            "selling_produce_b": "",
            "gov_scheme_benefit_b": "",
            "financial_goals_set_c": "",
            "collaborate_with_workers_c": "",
            "daily_affairs_management_c": "",
            "financial_decision_maker_c": "",
            "daily_accounts_book_c": ""

        });

    const [open, setOpen] = React.useState(false);

    const assestsOwned = [
        { id: 1, name: "Property owned (Asset) / ಆಸ್ತಿ ಮಾಲೀಕತ್ವ (ಆಸ್ತಿ) " },
        { id: 2, name: "Bank Loan (Liability) /  ಬ್ಯಾಂಕ್ ಸಾಲ (ಬಾಧ್ಯತೆ) " },
        { id: 3, name: "Gold (Asset) / ಚಿನ್ನ (ಆಸ್ತಿ)" },
        { id: 4, name: "Mortgage (Liability) /  ಅಡಮಾನ (ಬಾಧ್ಯತೆ) " },
        { id: 5, name: "Vehicle 2 wheeler / ವಾಹನ 2 ಚಕ್ರ " },
        { id: 6, name: "4 wheeler (Asset) / 4 ಚಕ್ರ ವಾಹನ (ಆಸ್ತಿ)" },

    ]
    const newBookkeepingEntries = [
        { id: 1, name: "Lending Rs. 500 for a neighbour for one day / ಸಾಲ ನೀಡುವುದು ರೂ. ಒಂದು ದಿನಕ್ಕೆ ನೆರೆಯವರಿಗೆ 500" },
        { id: 2, name: "Profit from the enterprise / ಉದ್ಯಮದಿಂದ ಲಾಭ" },
        { id: 3, name: "Spending Rs. 50 for transport / ಖರ್ಚು ರೂ. ಸಾರಿಗೆಗಾಗಿ 50" },
        { id: 4, name: "Loan taken from bank / ಬ್ಯಾಂಕ್‌ನಿಂದ ಪಡೆದ ಸಾಲ" },
        { id: 5, name: "Money withdrawn from bank, ATM and kept at home / ಬ್ಯಾಂಕ್, ಎಟಿಎಂನಿಂದ ಹಿಂತೆಗೆದುಕೊಂಡ ಹಣ ಮತ್ತು ಮನೆಯಲ್ಲಿ ಇಡಲಾಗಿದೆ" },
        { id: 6, name: "None / ಯಾವುದು ಇಲ್ಲ" }
    ];
    const purposesForMoney = [
        { id: 1, name: "To buy an asset (Productive) / ಆಸ್ತಿಯನ್ನು ಖರೀದಿಸಲು (ಉತ್ಪಾದಕ)" },
        { id: 2, name: "To start a business (Productive) / ವ್ಯವಹಾರವನ್ನು ಪ್ರಾರಂಭಿಸಲು (ಉತ್ಪಾದಕ)" },
        { id: 3, name: "To buy a new saree for a wedding (Consumptive) / ಮದುವೆಗೆ ಹೊಸ ಸೀರೆ ಖರೀದಿಸಲು (ಉಪಯೋಗ)" },
        { id: 4, name: "For festival celebrations (Consumptive) / ಹಬ್ಬದ ಆಚರಣೆಗಳಿಗಾಗಿ (ಉಪಯೋಗ)" },
        { id: 5, name: "Children's education (Productive) / ಮಕ್ಕಳ ಶಿಕ್ಷಣ (ಉತ್ಪಾದಕ)" },
        { id: 6, name: "For bigger TV (Consumptive) / ದೊಡ್ಡ ಟಿವಿಗಾಗಿ (ಉಪಯೋಗ)" },
        { id: 7, name: "For a fancy phone (Consumptive) / ಅಲಂಕಾರಿಕ ಫೋನ್‌ಗಾಗಿ (ಸೇವಕ)" }
    ];
    const timeFrequencies = [
        { id: 1, name: "Monthly / ಮಾಸಿಕ" },
        { id: 2, name: "Once in two months / ಎರಡು ತಿಂಗಳಿಗೊಮ್ಮೆ" },
        { id: 3, name: "Once in 6 months / 6 ತಿಂಗಳಿಗೊಮ್ಮೆ" },
        { id: 4, name: "Once in a year / ವರ್ಷಕ್ಕೊಮ್ಮೆ" }
    ];
    const personalRelationships = [
        { id: 1, name: "I am / ನಾನು" },
        { id: 2, name: "My husband is / ನನ್ನ ಪತಿ" },
        { id: 3, name: "Both my husband and I / ನನ್ನ ಪತಿ ಮತ್ತು ನಾನು ಇಬ್ಬರೂ" },
        { id: 4, name: "The elders like my father-in-law / ನನ್ನ ಮಾವನಂತೆ ಹಿರಿಯರು" },
        { id: 5, name: "Other—------------ / ಇತರೆ------------" }
    ];
    const familyRoles = [
        { id: 1, name: "Self / ಸ್ವಯಂ" },
        { id: 2, name: "Other family members / ಇತರ ಕುಟುಂಬ ಸದಸ್ಯರು" }
    ];

    const loanPurposes = [
        { id: 1, name: "Land related / ಭೂಮಿಗೆ ಸಂಬಂಧಿಸಿದ" },
        { id: 2, name: "Business or enterprise / ವ್ಯಾಪಾರ ಅಥವಾ ಉದ್ಯಮ" },
        { id: 3, name: "Livelihoods related / ಜೀವನೋಪಾಯಕ್ಕೆ ಸಂಬಂಧಿಸಿದ" },
        { id: 4, name: "Health / ಆರೋಗ್ಯ" },
        { id: 5, name: "Rations or daily household needs / ಪಡಿತರ ಅಥವಾ ದೈನಂದಿನ ಮನೆಯ ಅಗತ್ಯಗಳು" },
        { id: 6, name: "Education / ಶಿಕ್ಷಣ" },
        { id: 7, name: "Social ceremonies / ಸಾಮಾಜಿಕ ಸಮಾರಂಭಗಳು" },
        { id: 8, name: "Other / ಇತರೆ" },
        { id: 9, name: "No loans taken / ಯಾವುದೇ ಸಾಲವನ್ನು ತೆಗೆದುಕೊಳ್ಳುವುದಿಲ್ಲ" }
    ];
    const loanSources = [
        { id: 1, name: "Bank / ಬ್ಯಾಂಕ್" },
        { id: 2, name: "MFI / ಕಿರುಬಂಡವಾಳ ಸಂಸ್ಥೆಗಳು" },
        { id: 3, name: "Money lender / ಸಾಲ ನೀಡುವವನು" },
        { id: 4, name: "Friends, Family, Neighbour / ಸ್ನೇಹಿತರು, ಕುಟುಂಬ, ನೆರೆಹೊರೆಯವರು" },
        { id: 5, name: "SHGs / ಸ್ವ ಸಹಾಯ ಸಂಘಗಳು" },
        { id: 6, name: "Chit funds / ಚೀಟಿ ವ್ಯವಹಾರ" },
        { id: 7, name: "Other / ಇತರೆ" },
        { id: 8, name: "NA / ಯಾವುದು ಅಲ್ಲ" }
    ];
    const timeDurations = [
        { id: 1, name: "Not even a day / ಒಂದು ದಿನವೂ ಆಗುವುದಿಲ್ಲ" },
        { id: 2, name: "Less than a week / ಒಂದು ವಾರಕ್ಕಿಂತ ಕಡಿಮೆ" },
        { id: 3, name: "At least a week but not a month / ಕನಿಷ್ಠ ಒಂದು ವಾರ ಆದರೆ ಒಂದು ತಿಂಗಳಲ್ಲ" },
        { id: 4, name: "At least 3 months / ಕನಿಷ್ಠ 3 ತಿಂಗಳು" },
        { id: 5, name: "At least 6 months / ಕನಿಷ್ಠ 6 ತಿಂಗಳು" },
        { id: 6, name: "More than 6 months / 6 ತಿಂಗಳಿಗಿಂತ ಹೆಚ್ಚು" },
        { id: 7, name: "I don't know / ನನಗೆ ಗೊತ್ತಿಲ್ಲ" }
    ];
    const businessTypes = [
        { id: 1, name: "Kirana shop / ಕಿರಣ ಅಂಗಡಿ" },
        { id: 2, name: "Tailoring / ಟೈಲರಿಂಗ್" },
        { id: 3, name: "Printing or Xerox / ಪ್ರಿಂಟಿಂಗ್ ಅಥವಾ ಜೆರಾಕ್ಸ್" },
        { id: 4, name: "Beauty parlour / ಬ್ಯೂಟಿ ಪಾರ್ಲರ್" },
        { id: 5, name: "Vegetable vendor / ತರಕಾರಿ ಮಾರಾಟಗಾರ" },
        { id: 6, name: "Handloom / ಕೈಮಗ್ಗ" },
        { id: 7, name: "Small shop (beedi/fruits/flowers/coconut) / ಸಣ್ಣ ಅಂಗಡಿ (ಬೀಡಿ / ಹಣ್ಣುಗಳು / ಹೂವುಗಳು / ತೆಂಗಿನಕಾಯಿ)" },
        { id: 8, name: "Animal husbandry (livestock) / ಪಶುಸಂಗೋಪನೆ (ಜಾನುವಾರು)" },
        { id: 9, name: "Cloth business from home / ಮನೆಯಿಂದ ಬಟ್ಟೆ ವ್ಯಾಪಾರ" },
        { id: 10, name: "Agro processing / ಕೃಷಿ ಸಂಸ್ಕರಣೆ" },
        { id: 11, name: "Eatery or hotel / ತಿನಿಸು ಅಥವಾ ಹೋಟೆಲ್" },
        { id: 12, name: "Others specify………………………. / ಇತರೆ ನಿರ್ದಿಷ್ಟಪಡಿಸಿ... ……………………." }
    ];
    const environmentalPractices = [
        { id: 1, name: "Rain harvesting (Environment friendly // hazardous to the environment) / ಮಳೆ ಕೊಯ್ಲು (ಪರಿಸರ ಸ್ನೇಹಿ // ಪರಿಸರಕ್ಕೆ ಅಪಾಯಕಾರಿ)" },
        { id: 2, name: "Putting both wet and dry waste together? (Environment friendly // hazardous to the environment) / ಒದ್ದೆ ಮತ್ತು ಒಣ ತ್ಯಾಜ್ಯ ಎರಡನ್ನೂ ಒಟ್ಟಿಗೆ ಸೇರಿಸುವುದೇ? (ಪರಿಸರ ಸ್ನೇಹಿ // ಪರಿಸರಕ್ಕೆ ಅಪಾಯಕಾರಿ)" },
        { id: 3, name: "Burning of household waste (Environment friendly // hazardous to the environment) / ಮನೆಯ ತ್ಯಾಜ್ಯವನ್ನು ಸುಡುವುದು (ಪರಿಸರ ಸ್ನೇಹಿ // ಪರಿಸರಕ್ಕೆ ಅಪಾಯಕಾರಿ)" },
        { id: 4, name: "Using organic fertilizers in agriculture (Environment friendly // hazardous to the environment) / ಕೃಷಿಯಲ್ಲಿ ಸಾವಯವ ಗೊಬ್ಬರಗಳ ಬಳಕೆ (ಪರಿಸರ ಸ್ನೇಹಿ // ಪರಿಸರಕ್ಕೆ ಅಪಾಯಕಾರಿ)" },
        { id: 5, name: "Increased use of plastic (Environment friendly // hazardous to the environment) / ಹೆಚ್ಚಿದ ಪ್ಲಾಸ್ಟಿಕ್ ಬಳಕೆ (ಪರಿಸರ ಸ್ನೇಹಿ // ಪರಿಸರಕ್ಕೆ ಅಪಾಯಕಾರಿ)" },
        { id: 6, name: "Throwing household waste into river/canals/or other water bodies (Environment friendly // hazardous to the environment) / ಮನೆಯ ತ್ಯಾಜ್ಯವನ್ನು ನದಿ/ಕಾಲುವೆ/ಅಥವಾ ಇತರ ಜಲಮೂಲಗಳಿಗೆ ಎಸೆಯುವುದು (ಪರಿಸರ ಸ್ನೇಹಿ // ಪರಿಸರಕ್ಕೆ ಅಪಾಯಕಾರಿ)" }
    ];
    const hygieneProducts = [
        { id: 1, name: "Cloth / ಬಟ್ಟೆ" },
        { id: 2, name: "Sanitary napkins / ಸ್ಯಾನಿಟರಿ ನ್ಯಾಪ್‌ಕಿನ್‌ಗಳು" },
        { id: 3, name: "Tampons / ಟ್ಯಾಂಪೂನ್‌ಗಳು" },
        { id: 4, name: "Menstrual Cups / ಮುಟ್ಟಿನ ಕಪ್‌ಗಳು" }
    ];
    const actions = [
        { id: 1, name: "Wash / ತೊಳೆದು" },
        { id: 2, name: "Burn / ಸುಟ್ಟು" },
        { id: 3, name: "Throw it away / ದೂರ ಎಸೆಯಿರಿ" },
        { id: 4, name: "Flush it down the closet / ಕ್ಲೋಸೆಟ್ ಕೆಳಗೆ ಫ್ಲಶ್ ಮಾಡಿ" }
    ];
    const cookingMethods = [
        { id: 1, name: "Choolha using firewood / ಸೌದೆ ಓಲೆ" },
        { id: 2, name: "Biogas / ಬಯೋಗ್ಯಾಸ್ ಸ್ಟೌ" },
        { id: 3, name: "Stove / ಸ್ಟೋವ್" },
        { id: 4, name: "LPG / ಎಲ್‌ಪಿಜಿ" },
        { id: 5, name: "Electric or induction stove / ಎಲೆಕ್ಟ್ರಿಕ್ ಅಥವಾ ಇಂಡಕ್ಷನ್ ಸ್ಟವ್" }
    ];

    React.useEffect(() => {
        //setShown(shown)
        setOpen(editSession)

    }, [editSession])
    React.useEffect(() => {
        Occupation();
    }, [])

    const [reload, setREload] = useState(false)
    const Occupation = () => {
        const data = {
            "participantId": participantId
        }
        var config = {
            method: 'post',
            url: baseURL + 'getSelfShaktiBaselineSurvey',

            headers: {
                'Authorization': `${apikey}`
            },
            data: data
        };
        axios(config)
            .then(function (response) {
                console.log(response.data.data[0], "response")
                setSendData(response.data.data[0])
                setREload(!reload)
            })
            .catch(function (error) {
                // console.log(error);
            });

    }

    useEffect(() => {
        console.log("useEffect calling ", sendData.firstName)
    }, [reload])

    console.log(sendData, "sendData")

    useEffect(() => {
        if (participantId) {
            setSendData(prevData => ({
                ...prevData,
                id: participantId
            }));
        }
    }, [participantId]);

    return (
        <div>
            <Dialog fullScreen open={open} onClose={() => setShowForm()}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description">
                <form

                >
                    <Toolbar sx={{ bgcolor: '#ed6c02', color: 'white' }} >
                        <IconButton edge="start" sx={{ color: "inherit" }} onClick={() => setShowForm()} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1, color: "inherit" }} variant="h6" component="div" >
                            View Participant Detail
                        </Typography>

                        {/* <Button autoFocus color="inherit"
              type='submit'
            // onClick={() => SendData()}
            >
              save
            </Button> */}
                    </Toolbar>

                    <DialogContent dividers={scroll === 'paper'} sx={{ background: "#f9fafb" }}>
                        <DialogContentText
                            id="scroll-dialog-description"
                            tabIndex={-1}
                        >

                            {
                                (sendData.saving_amt != "0") ?

                                    <>

                                        <Card style={{ marginTop: 10, borderRadius: 20 }}>
                                            <CardContent>


                                                <Stack mt={1}>
                                                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                        Day 1 Details

                                                    </Typography>



                                                </Stack>

                                            </CardContent>
                                        </Card>
                                        <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                                            <CardContent>
                                                <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                    % of Women With increased Self Esteem{' '}
                                                </Typography>

                                                <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                                                    <CardContent>
                                                        <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                            1. I feel That I am Person of worth
                                                        </Typography>
                                                        <Stack mt={3}>
                                                            <TextField
                                                                id="Your Answer"
                                                                disabled
                                                                label="Your Answer"
                                                                variant="outlined"
                                                                value={sendData.personOfWorth}
                                                            />
                                                        </Stack>
                                                    </CardContent>
                                                </Card>
                                                <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                                                    <CardContent>
                                                        <Typography variant="subtitle2" style={{ color: '#ff7424' }}>2. I feel That I have Several good Qualities</Typography>
                                                        <Stack mt={3}>
                                                            <TextField
                                                                id="Your Answer"
                                                                disabled
                                                                label="Your Answer"
                                                                variant="outlined"
                                                                value={sendData.goodQuality}
                                                            />
                                                        </Stack>
                                                    </CardContent>
                                                </Card>
                                                <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                                                    <CardContent>

                                                        <Typography variant="subtitle2" style={{ color: '#ff7424' }}>3. Sometimes I feel I am a Failure Person</Typography>
                                                        <Stack mt={3}>
                                                            <TextField
                                                                id="Your Answer"
                                                                disabled
                                                                label="Your Answer"
                                                                variant="outlined"
                                                                value={sendData.amFailure}
                                                            />
                                                        </Stack>

                                                    </CardContent>
                                                </Card>
                                            </CardContent>
                                        </Card>
                                        <CardContent>


                                            <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                                                <CardContent>
                                                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                        Number of Women Work Toward Their Goal and Continuosly Track It Using The Buzz Self Assessment Tools
                                                        Women Who Have Goal
                                                    </Typography>

                                                    <Stack mt={3}>
                                                        <TextField
                                                            disabled
                                                            id="Your Answer"
                                                            variant="outlined"
                                                            value={sendData.haveGoal}
                                                        />
                                                    </Stack>

                                                </CardContent>
                                            </Card>
                                            <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                                                <CardContent>
                                                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>2. Is there a pathway to that goal ?</Typography>
                                                    <Stack mt={3}>
                                                        <TextField
                                                            id="Your Answer"
                                                            disabled
                                                            label="Your Answer"
                                                            variant="outlined"
                                                            value={sendData.pathwayToGoal}
                                                        />
                                                    </Stack>
                                                </CardContent>
                                            </Card>
                                            <hr />
                                            <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                                                <CardContent>
                                                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                        Number of women who believe they can find solutions through self initiative
                                                    </Typography>

                                                    <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                                                        <CardContent>
                                                            <Typography variant="subtitle2" style={{ color: '#ff7424' }}>1. I look at problems and get disheartened</Typography>
                                                            <Stack mt={3}>
                                                                <TextField
                                                                    id="Your Answer"
                                                                    disabled
                                                                    label="Your Answer"
                                                                    variant="outlined"
                                                                    value={sendData.disheartenedToProblems}
                                                                />
                                                            </Stack>
                                                        </CardContent>
                                                    </Card>
                                                    <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                                                        <CardContent>
                                                            <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                                2. I take problem and attempt to think about solutions for it ?
                                                            </Typography>
                                                            <Stack mt={3}>
                                                                <TextField
                                                                    id="Your Answer"
                                                                    disabled
                                                                    label="Your Answer"
                                                                    variant="outlined"
                                                                    value={sendData.solutionToProblems}
                                                                />
                                                            </Stack>
                                                        </CardContent>
                                                    </Card>
                                                    <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                                                        <CardContent>
                                                            <Typography variant="subtitle2" style={{ color: '#ff7424' }}>

                                                                3. Once I Choose A Solution I Make An Implementation Plan For It ?
                                                            </Typography>

                                                            <Stack mt={3}>
                                                                <TextField
                                                                    id="Your Answer"
                                                                    disabled
                                                                    label="Your Answer"
                                                                    variant="outlined"
                                                                    value={sendData.implementationPlan}
                                                                />
                                                            </Stack>
                                                        </CardContent>
                                                    </Card>
                                                    <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                                                        <CardContent>
                                                            <Typography variant="subtitle2" style={{ color: '#ff7424' }}>4. I Look A Solution Since I Don't Have An Choice?</Typography>
                                                            <Stack mt={3}>
                                                                <TextField
                                                                    id="Your Answer"
                                                                    disabled
                                                                    label="Your Answer"
                                                                    variant="outlined"
                                                                    value={sendData.noChoiceForSolution}
                                                                />
                                                            </Stack>
                                                        </CardContent>
                                                    </Card>
                                                </CardContent>
                                            </Card>
                                            <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                                                <CardContent>
                                                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                        Number of Women With Basic Financial Management Knowledge On Income Vs Expenditure , Book Keeping
                                                        etc
                                                    </Typography>

                                                    <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                                                        <CardContent>
                                                            <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                                1. If You Invest Rs 10,000 as Capital In Saree Buisness For 20 Saree . You Spend Rs 100 to Transport
                                                                the Saree from the Wholesale to your Village . If You Sell All The Saree In For Rs 12,000 , How Much
                                                                Profit You Have Made.
                                                            </Typography>
                                                            <Stack mt={3}>
                                                                <TextField
                                                                    id="Your Answer"
                                                                    disabled
                                                                    label="Your Answer"
                                                                    variant="outlined"
                                                                    value={sendData.profitForSarees}
                                                                />
                                                            </Stack>
                                                        </CardContent>
                                                    </Card>
                                                    <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                                                        <CardContent>
                                                            <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                                2. You Have Taken A Loan Of Rs 10,000 To be Paid Back In Equally Monthly Payments In One Year And
                                                                You Have To Pay Back Rs 1000 A Month. WHat Is The Annual Interest Rate ?
                                                            </Typography>
                                                            <Stack mt={3}>
                                                                <TextField
                                                                    id="Your Answer"
                                                                    disabled
                                                                    label="Your Answer"
                                                                    variant="outlined"
                                                                    value={sendData.annualLoanInterest}
                                                                />
                                                            </Stack>
                                                        </CardContent>
                                                    </Card>
                                                </CardContent>
                                            </Card>
                                            <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                                                <CardContent>
                                                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                        Number of Trained Women With Growing Savings (how much saved , frequency , regularities of savings)
                                                    </Typography>

                                                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>1. Do You Save Regularly ?</Typography>
                                                    <Stack mt={2}>
                                                        <RadioGroup
                                                            aria-labelledby="demo-radio-buttons-group-label"
                                                            value={sendData.saveRegularly === "1" ? "1" : "0"}  // Show "1" for Yes, "0" for No
                                                            name="radio-buttons-group"
                                                            disabled // Disable the radio group to make it read-only
                                                        >
                                                            <div style={{ display: 'flex' }}>
                                                                <FormControlLabel
                                                                    value="0"  // Value "0" represents "No"
                                                                    control={<Radio style={{ color: '#595959' }} />}
                                                                    label="No"
                                                                />
                                                                <FormControlLabel
                                                                    value="1"  // Value "1" represents "Yes"
                                                                    control={<Radio style={{ color: '#595959' }} />}
                                                                    label="Yes"
                                                                />
                                                            </div>
                                                        </RadioGroup>
                                                    </Stack>
                                                </CardContent>
                                            </Card>
                                            <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                                                <CardContent>
                                                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>2. Where Do You Save Up Money ? </Typography>
                                                    <Stack mt={3}>
                                                        <TextField
                                                            id="Your Answer"
                                                            disabled
                                                            label="Your Answer"
                                                            variant="outlined"
                                                            value={sendData.whereSaveMoney}
                                                        />
                                                    </Stack>
                                                </CardContent>
                                            </Card>
                                            <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                                                <CardContent>
                                                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>3. What Is The Frequency Of Your Savings ? </Typography>
                                                    <Stack mt={3}>
                                                        <TextField
                                                            id="Your Answer"
                                                            disabled
                                                            label="Your Answer"
                                                            variant="outlined"
                                                            value={sendData.frequencyOfSaving}
                                                        />
                                                    </Stack>
                                                </CardContent>
                                            </Card>
                                            <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                                                <CardContent>
                                                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                        Number Of Women Who Decide On How To Handle Their Personal Finances .
                                                    </Typography>
                                                    <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                                                        <CardContent>
                                                            <Typography variant="subtitle2" style={{ color: '#ff7424' }}>1. Do You Own Assets In Your Name ?</Typography>

                                                            <Stack mt={2}>
                                                                <RadioGroup
                                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                                    name="radio-buttons-group"
                                                                    value={sendData.ownAsset === "1" ? "1" : "0"}  // Show "1" for Yes, "0" for No

                                                                    disabled // Disable the radio group to make it read-only
                                                                >
                                                                    <div style={{ display: 'flex' }}>
                                                                        <FormControlLabel
                                                                            value="0"  // Value "0" represents "No"
                                                                            control={<Radio style={{ color: '#595959' }} />}
                                                                            label="No"
                                                                        />
                                                                        <FormControlLabel
                                                                            value="1"  // Value "1" represents "Yes"
                                                                            control={<Radio style={{ color: '#595959' }} />}
                                                                            label="Yes"
                                                                        />
                                                                    </div>
                                                                </RadioGroup>
                                                            </Stack>
                                                        </CardContent>
                                                    </Card>
                                                    <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                                                        <CardContent>
                                                            <Typography variant="subtitle2" style={{ color: '#ff7424' }}>2. Do You Seperate Financial Assets/Savings From That of Your Husbands ?</Typography>

                                                            <Stack mt={2}>
                                                                <RadioGroup
                                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                                    disabled
                                                                    name="radio-buttons-group"
                                                                    value={sendData.separateFinancialAsset === "1" ? "1" : "0"}  // Show "1" for Yes, "0" for No


                                                                >
                                                                    <div style={{ display: 'flex' }}>
                                                                        <FormControlLabel
                                                                            value="0"  // Value "0" represents "No"
                                                                            control={<Radio style={{ color: '#595959' }} />}
                                                                            label="No"
                                                                        />
                                                                        <FormControlLabel
                                                                            value="1"  // Value "1" represents "Yes"
                                                                            control={<Radio style={{ color: '#595959' }} />}
                                                                            label="Yes"
                                                                        />
                                                                    </div>
                                                                </RadioGroup>
                                                            </Stack>
                                                        </CardContent>
                                                    </Card>
                                                    <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                                                        <CardContent>
                                                            <Typography variant="subtitle2" style={{ color: '#ff7424' }}>3. Do You Spend The Money Earned By You As You Want To?</Typography>

                                                            <Stack mt={2}>
                                                                <RadioGroup
                                                                    aria-labelledby="demo-radio-buttons-group-label"

                                                                    value={sendData.spendMoney === "1" ? "1" : "0"}  // Show "1" for Yes, "0" for No
                                                                    name="radio-buttons-group"
                                                                    disabled // Disable the radio group to make it read-only
                                                                >
                                                                    <div style={{ display: 'flex' }}>
                                                                        <FormControlLabel
                                                                            value="0"  // Value "0" represents "No"
                                                                            control={<Radio style={{ color: '#595959' }} />}
                                                                            label="No"
                                                                        />
                                                                        <FormControlLabel
                                                                            value="1"  // Value "1" represents "Yes"
                                                                            control={<Radio style={{ color: '#595959' }} />}
                                                                            label="Yes"
                                                                        />
                                                                    </div>
                                                                </RadioGroup>
                                                            </Stack>
                                                        </CardContent>
                                                    </Card>
                                                    <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                                                        <CardContent>
                                                            <Typography variant="subtitle2" style={{ color: '#ff7424' }}>4. Do You Have A Loan?</Typography>

                                                            <Stack mt={2}>
                                                                <RadioGroup
                                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                                    // defaultValue="Yes"
                                                                    disabled
                                                                    name="radio-buttons-group"
                                                                    value={sendData.haveLoan === "1" ? "1" : "0"}  // Show "1" for Yes, "0" for No
                                                                >
                                                                    <div style={{ display: 'flex' }}>
                                                                        <FormControlLabel
                                                                            value="0"  // Value "0" represents "No"
                                                                            control={<Radio style={{ color: '#595959' }} />}
                                                                            label="No"
                                                                        />
                                                                        <FormControlLabel
                                                                            value="1"  // Value "1" represents "Yes"
                                                                            control={<Radio style={{ color: '#595959' }} />}
                                                                            label="Yes"
                                                                        />
                                                                    </div>
                                                                </RadioGroup>
                                                            </Stack>
                                                        </CardContent>
                                                    </Card>
                                                    <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                                                        <CardContent>
                                                            <Typography variant="subtitle2" style={{ color: '#ff7424' }}>5. In Whose Name Is the Loan ?</Typography>

                                                            <Stack mt={2}>
                                                                <TextField
                                                                    id="Your Answer"
                                                                    disabled
                                                                    label="Your Answer"
                                                                    variant="outlined"
                                                                    value={sendData.loanOnWhoseName}
                                                                />
                                                            </Stack>
                                                        </CardContent>
                                                    </Card>
                                                    <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                                                        <CardContent>
                                                            <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                                6. What Are All the Places That You Have Ever Borrowed Money Or Taken Out Loan From ?
                                                            </Typography>
                                                            {/* //check this  */}
                                                            <Stack mt={3}>
                                                                <TextField
                                                                    id="Your Answer"
                                                                    disabled
                                                                    label="Your Answer"
                                                                    variant="outlined"
                                                                    value={sendData?.loanSources}

                                                                />
                                                            </Stack>
                                                        </CardContent>
                                                    </Card>
                                                    <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                                                        <CardContent>
                                                            <Typography variant="subtitle2" style={{ color: '#ff7424' }}>7. What Is The Reason To Borrow A Loan ?</Typography>
                                                            {/* //check this  */}
                                                            <Stack mt={3}>
                                                                <TextField
                                                                    id="Your Answer"
                                                                    disabled
                                                                    label="Your Answer"
                                                                    variant="outlined"
                                                                    value={sendData.reasonOthersToBorrowLoan}
                                                                />
                                                            </Stack>
                                                        </CardContent>
                                                    </Card>
                                                </CardContent>
                                            </Card>
                                            <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                                                <CardContent>
                                                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                        Number Of Women With A Financial Plan For Next 1 Year
                                                    </Typography>

                                                    <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                                                        <CardContent>
                                                            <Typography variant="subtitle2" style={{ color: '#ff7424' }}>1. Do You Have A Specific Goal That You Are Saving Up For ?</Typography>
                                                            <Stack mt={2}>
                                                                <RadioGroup
                                                                    aria-labelledby="demo-radio-buttons-group-label"

                                                                    value={sendData.specificGoalForSavings === "1" ? "1" : "0"}  // Show "1" for Yes, "0" for No
                                                                    name="radio-buttons-group"
                                                                    disabled // Disable the radio group to make it read-only
                                                                >
                                                                    <div style={{ display: 'flex' }}>
                                                                        <FormControlLabel
                                                                            value="0"  // Value "0" represents "No"
                                                                            control={<Radio style={{ color: '#595959' }} />}
                                                                            label="No"
                                                                        />
                                                                        <FormControlLabel
                                                                            value="1"  // Value "1" represents "Yes"
                                                                            control={<Radio style={{ color: '#595959' }} />}
                                                                            label="Yes"
                                                                        />
                                                                    </div>
                                                                </RadioGroup>
                                                            </Stack>
                                                        </CardContent>
                                                    </Card>
                                                    <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                                                        <CardContent>
                                                            <Typography variant="subtitle2" style={{ color: '#ff7424' }}>2. How Much Do You Need To Save Up To Achieve This Goal ?</Typography>
                                                            <Stack mt={3}>
                                                                <TextField
                                                                    id="Your Answer"
                                                                    disabled
                                                                    label="Your Answer"
                                                                    variant="outlined"
                                                                    value={sendData.howMuchSaveToAchieve}
                                                                />
                                                            </Stack>
                                                        </CardContent>
                                                    </Card>
                                                </CardContent>
                                            </Card>
                                            <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                                                <CardContent>
                                                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                        Number Of Women Who Actively Participate In HouseHold Financial Decison Making{' '}
                                                    </Typography>
                                                    <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                                                        <CardContent>

                                                            <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                                {' '}
                                                                1. Who Takes the Majority of Decisons From the Following Household?
                                                            </Typography>


                                                            <Stack>
                                                                <Typography variant="subtitle2" style={{ color: '#ff7424' }}> Education</Typography>

                                                                <TextField
                                                                    id="Your Answer"
                                                                    disabled
                                                                    label="Your Answer"
                                                                    variant="outlined"
                                                                    value={sendData.educationDecision}
                                                                />
                                                            </Stack>
                                                        </CardContent>
                                                    </Card>
                                                    <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                                                        <CardContent>
                                                            <Typography variant="subtitle2" style={{ color: '#ff7424' }}> Access To HealthCare </Typography>
                                                            <Stack mt={3}>
                                                                <TextField
                                                                    id="Your Answer"
                                                                    disabled
                                                                    label="Your Answer"
                                                                    variant="outlined"
                                                                    value={sendData.accessToHealtcare}
                                                                />
                                                            </Stack>
                                                        </CardContent>
                                                    </Card>
                                                    <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                                                        <CardContent>
                                                            <Typography variant="subtitle2" style={{ color: '#ff7424' }}> Access To Credit </Typography>
                                                            <Stack mt={3}>
                                                                <TextField
                                                                    id="Your Answer"
                                                                    disabled
                                                                    label="Your Answer"
                                                                    variant="outlined"
                                                                    value={sendData.accessToCredit}
                                                                />
                                                            </Stack>
                                                        </CardContent>
                                                    </Card>
                                                    <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                                                        <CardContent>
                                                            <Typography variant="subtitle2" style={{ color: '#ff7424' }}> Saving Money </Typography>
                                                            <Stack mt={3}>
                                                                <TextField
                                                                    id="Your Answer"
                                                                    disabled
                                                                    label="Your Answer"
                                                                    variant="outlined"
                                                                    value={sendData.savingMoney}
                                                                />
                                                            </Stack>
                                                        </CardContent>
                                                    </Card>
                                                    <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                                                        <CardContent>
                                                            <Typography variant="subtitle2" style={{ color: '#ff7424' }}> Asset Purchase </Typography>
                                                            <Stack mt={3}>
                                                                <TextField
                                                                    id="Your Answer"
                                                                    disabled
                                                                    label="Your Answer"
                                                                    variant="outlined"
                                                                    value={sendData.assetPurchase}
                                                                />
                                                            </Stack>
                                                        </CardContent>
                                                    </Card>
                                                    <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                                                        <CardContent>
                                                            <Typography variant="subtitle2" style={{ color: '#ff7424' }}> Day To Day Expenditure </Typography>
                                                            <Stack mt={3}>
                                                                <TextField
                                                                    id="Your Answer"
                                                                    disabled
                                                                    label="Your Answer"
                                                                    variant="outlined"
                                                                    value={sendData.dayTodayExpenditure}
                                                                />
                                                            </Stack>
                                                        </CardContent>
                                                    </Card>
                                                    <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                                                        <CardContent>
                                                            <Typography variant="subtitle2" style={{ color: '#ff7424' }}> Livelihood </Typography>
                                                            <Stack mt={3}>
                                                                <TextField
                                                                    id="Your Answer"
                                                                    disabled
                                                                    label="Your Answer"
                                                                    variant="outlined"
                                                                    value={sendData.livelihood}
                                                                />
                                                            </Stack>
                                                        </CardContent>
                                                    </Card>

                                                </CardContent>
                                            </Card>
                                            <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                                                <CardContent>
                                                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                        Number Of Women Who Finds Solution In Beehive Sessions
                                                    </Typography>

                                                    <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                                                        <CardContent>
                                                            <Typography variant="subtitle2" style={{ color: '#ff7424' }}>1. Do You See yourself as a part of a community?</Typography>

                                                            <Stack mt={2}>
                                                                <RadioGroup
                                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                                    disabled
                                                                    name="radio-buttons-group"
                                                                    value={sendData.partOfCollective === "1" ? "1" : "0"}  // Show "1" for Yes, "0" for No

                                                                >
                                                                    <div style={{ display: 'flex' }}>
                                                                        <FormControlLabel
                                                                            value="0"  // Value "0" represents "No"
                                                                            control={<Radio style={{ color: '#595959' }} />}
                                                                            label="No"
                                                                        />
                                                                        <FormControlLabel
                                                                            value="1"  // Value "1" represents "Yes"
                                                                            control={<Radio style={{ color: '#595959' }} />}
                                                                            label="Yes"
                                                                        />
                                                                    </div>
                                                                </RadioGroup>
                                                            </Stack>
                                                        </CardContent>
                                                    </Card>
                                                </CardContent>
                                            </Card>

                                            <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                                                <CardContent>
                                                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                        Number of women who believe that she has a social capital in the community
                                                    </Typography>
                                                    <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                                                        <CardContent>
                                                            <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                                {' '}
                                                                1. It Is Important For Woman To Come Together And Share Their Everyday Challenges And Problems{' '}
                                                            </Typography>
                                                            <Stack mt={3}>
                                                                <TextField
                                                                    id="Your Answer"
                                                                    disabled
                                                                    label="Your Answer"
                                                                    variant="outlined"
                                                                    value={sendData.importantToShareTheirProb}
                                                                />
                                                            </Stack>
                                                        </CardContent>
                                                    </Card>
                                                    <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                                                        <CardContent>
                                                            <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                                2. I Have A Woman In My Community Whom I Share My Learnings And Problems , Solution With{' '}
                                                            </Typography>
                                                            <Stack mt={3}>
                                                                <TextField
                                                                    id="Your Answer"
                                                                    disabled
                                                                    label="Your Answer"
                                                                    variant="outlined"
                                                                    value={sendData.shareLearningWithCommunity}
                                                                />
                                                            </Stack>
                                                        </CardContent>
                                                    </Card>
                                                </CardContent>
                                            </Card>
                                            <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                                                <CardContent>
                                                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                        Other Requirements
                                                    </Typography>
                                                    <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                                                        <CardContent>
                                                            <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                                Are You Maintaining the household Books Of Accounts

                                                            </Typography>
                                                            <Stack mt={2}>
                                                                <RadioGroup
                                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                                    value={sendData.household_books_accounts === "1" ? "1" : "0"}  // Show "1" for Yes, "0" for No
                                                                    name="radio-buttons-group"
                                                                    disabled // Disable the radio group to make it read-only
                                                                >
                                                                    <div style={{ display: 'flex' }}>
                                                                        <FormControlLabel
                                                                            value="0"  // Value "0" represents "No"
                                                                            control={<Radio style={{ color: '#595959' }} />}
                                                                            label="No"
                                                                        />
                                                                        <FormControlLabel
                                                                            value="1"  // Value "1" represents "Yes"
                                                                            control={<Radio style={{ color: '#595959' }} />}
                                                                            label="Yes"
                                                                        />
                                                                    </div>
                                                                </RadioGroup>
                                                            </Stack>
                                                        </CardContent>
                                                    </Card>
                                                    <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                                                        <CardContent>
                                                            <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                                Are You Maintaining the Books Of Accounts For Self Enterprise
                                                            </Typography>

                                                            <Stack mt={2} mb={5}>

                                                                <RadioGroup
                                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                                    value={sendData.accounts_for_Self_Enterprises === "1" ? "1" : "0"}  // Show "1" for Yes, "0" for No
                                                                    name="radio-buttons-group"
                                                                    disabled // Disable the radio group to make it read-only
                                                                >
                                                                    <div style={{ display: 'flex' }}>
                                                                        <FormControlLabel
                                                                            value="0"  // Value "0" represents "No"
                                                                            control={<Radio style={{ color: '#595959' }} />}
                                                                            label="No"
                                                                        />
                                                                        <FormControlLabel
                                                                            value="1"  // Value "1" represents "Yes"
                                                                            control={<Radio style={{ color: '#595959' }} />}
                                                                            label="Yes"
                                                                        />
                                                                    </div>
                                                                </RadioGroup>
                                                            </Stack>
                                                        </CardContent>
                                                    </Card>
                                                </CardContent>
                                            </Card>
                                        </CardContent>
                                        <Card style={{ marginTop: 10, borderRadius: 20 }}>
                                            <CardContent>


                                                <Stack mt={1}>
                                                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                        Day 2 Details

                                                    </Typography>



                                                </Stack>

                                            </CardContent>
                                        </Card>
                                        <Card style={{ marginTop: 10, borderRadius: 20 }}>
                                            <CardContent>


                                                <Stack mt={1}>
                                                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                        Wife Occupation

                                                    </Typography>

                                                    <Stack mt={3}>
                                                        <TextField
                                                            id="Your Answer"
                                                            disabled
                                                            label="Your Answer"
                                                            variant="outlined"
                                                            value={sendData?.occupation}
                                                        />
                                                    </Stack>

                                                </Stack>

                                            </CardContent>
                                        </Card>
                                        <Card style={{ marginTop: 10, borderRadius: 20 }}>
                                            <CardContent>


                                                <Stack mt={1}>
                                                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                        Husband Occupation

                                                    </Typography>

                                                    <Stack mt={3}>
                                                        <TextField
                                                            id="Your Answer"
                                                            disabled
                                                            label="Your Answer"
                                                            variant="outlined"
                                                            value={sendData?.husbandOccupation}
                                                        />
                                                    </Stack>

                                                </Stack>

                                            </CardContent>
                                        </Card>

                                        <Card style={{ marginTop: 10, borderRadius: 20 }}>
                                            <CardContent>


                                                <Stack mt={1}>
                                                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                        Monthly Wife's income

                                                    </Typography>

                                                    <Stack mt={3}>
                                                        <TextField
                                                            id="Your Answer"
                                                            disabled
                                                            label="Your Answer"
                                                            variant="outlined"
                                                            value={sendData?.wifeIncomeMonthly}
                                                        />
                                                    </Stack>

                                                </Stack>

                                            </CardContent>
                                        </Card>
                                        <Card style={{ marginTop: 10, borderRadius: 20 }}>
                                            <CardContent>


                                                <Stack mt={1}>
                                                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                        Monthly Wife's Savings

                                                    </Typography>

                                                    <Stack mt={3}>
                                                        <TextField
                                                            id="Your Answer"
                                                            disabled
                                                            label="Your Answer"
                                                            variant="outlined"
                                                            value={sendData?.wifeSavingsMonthly}
                                                        />
                                                    </Stack>

                                                </Stack>

                                            </CardContent>
                                        </Card>
                                        <Card style={{ marginTop: 10, borderRadius: 20 }}>
                                            <CardContent>


                                                <Stack mt={1}>
                                                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                        What is your goal

                                                    </Typography>

                                                    <Stack mt={3}>
                                                        <TextField
                                                            id="Your Answer"
                                                            disabled
                                                            label="Your Answer"
                                                            variant="outlined"
                                                            value={sendData?.saving_goal}
                                                        />
                                                    </Stack>

                                                </Stack>

                                            </CardContent>
                                        </Card>
                                        <Card style={{ marginTop: 10, borderRadius: 20 }}>
                                            <CardContent>


                                                <Stack mt={1}>
                                                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                        Monthly Family Income

                                                    </Typography>

                                                    <Stack mt={3}>
                                                        <TextField
                                                            id="Your Answer"
                                                            disabled
                                                            label="Your Answer"
                                                            variant="outlined"
                                                            value={sendData?.income}
                                                        />
                                                    </Stack>

                                                </Stack>

                                            </CardContent>
                                        </Card>
                                        <Card style={{ marginTop: 10, borderRadius: 20 }}>
                                            <CardContent>


                                                <Stack mt={1}>
                                                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                        Monthly Family Savings

                                                    </Typography>

                                                    <Stack mt={3}>
                                                        <TextField
                                                            id="Your Answer"
                                                            disabled
                                                            label="Your Answer"
                                                            variant="outlined"
                                                            value={sendData?.saving_amt}
                                                        />
                                                    </Stack>

                                                </Stack>

                                            </CardContent>
                                        </Card>
                                        <Card style={{ marginTop: 10, borderRadius: 20 }}>
                                            <CardContent>


                                                <Stack mt={1}>
                                                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                        Type of Enterprise

                                                    </Typography>

                                                    <Stack mt={3}>
                                                        <TextField
                                                            id="Your Answer"
                                                            disabled
                                                            label="Your Answer"
                                                            variant="outlined"
                                                            value={sendData?.typeOfEnterprise}
                                                        />
                                                    </Stack>

                                                </Stack>

                                            </CardContent>
                                        </Card>
                                        <Card style={{ marginTop: 10, borderRadius: 20 }}>
                                            <CardContent>


                                                <Stack mt={1}>
                                                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                        Contact Number

                                                    </Typography>

                                                    <Stack mt={3}>
                                                        <TextField
                                                            id="Your Answer"
                                                            disabled
                                                            label="Your Answer"
                                                            variant="outlined"
                                                            value={sendData?.contact_no}
                                                        />
                                                    </Stack>

                                                </Stack>

                                            </CardContent>
                                        </Card>
                                        <Card style={{ marginTop: 10, borderRadius: 20 }}>
                                            <CardContent>


                                                <Stack mt={1}>
                                                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                        Husband Name

                                                    </Typography>

                                                    <Stack mt={3}>
                                                        <TextField
                                                            id="Your Answer"
                                                            disabled
                                                            label="Your Answer"
                                                            variant="outlined"
                                                            value={sendData?.husbandName}
                                                        />
                                                    </Stack>

                                                </Stack>

                                            </CardContent>
                                        </Card>

                                        <Card style={{ marginTop: 10, borderRadius: 20 }}>
                                            <CardContent>
                                                <Typography variant="subtitle2" style={{ color: '#ff7424' }}>Bank Account *</Typography>
                                                <Typography variant="subtitle2" style={{ color: '#ff7424' }}>

                                                </Typography>
                                                <RadioGroup
                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                    value={sendData.bank_acc === "1" ? "1" : "0"}  // Show "1" for Yes, "0" for No
                                                    name="radio-buttons-group"
                                                    disabled // Disable the radio group to make it read-only
                                                >
                                                    <div style={{ display: 'flex' }}>
                                                        <FormControlLabel
                                                            value="0"  // Value "0" represents "No"
                                                            control={<Radio style={{ color: '#595959' }} />}
                                                            label="No"
                                                        />
                                                        <FormControlLabel
                                                            value="1"  // Value "1" represents "Yes"
                                                            control={<Radio style={{ color: '#595959' }} />}
                                                            label="Yes"
                                                        />
                                                    </div>
                                                </RadioGroup>
                                            </CardContent>
                                        </Card>
                                        <Card style={{ marginTop: 10, borderRadius: 20 }}>
                                            <CardContent>
                                                <Stack id="create-poa-stack" direction={'row'}>
                                                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>Suggested Gelathi</Typography><br />
                                                    <Switch id="switch-suggested-gelathi" value={sendData?.gelathiRecomm}

                                                        disabled


                                                    />
                                                </Stack>
                                            </CardContent>
                                        </Card>

                                    </>
                                    :

                                    <>

                                        <Card style={{ marginTop: 10, borderRadius: 20 }}>
                                            <CardContent>


                                                <Stack mt={1}>
                                                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                        Day 1 Details

                                                    </Typography>



                                                </Stack>

                                            </CardContent>
                                        </Card>
                                        <Card style={{ marginTop: 10, borderRadius: 20 }}>
                                            <CardContent>


                                                <Card mt={1} style={{ marginTop: 50, borderRadius: 20 }}>
                                                    <CardContent>
                                                        <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                            Respondent’s name/ಪ್ರತಿಕ್ರಿಯಿಸಿದವರ ಹೆಸರು*
                                                        </Typography>
                                                        <Stack mt={2} mb={2}>
                                                            <TextField
                                                                id="twoquestions"
                                                                label="Your Answer"
                                                                disabled
                                                                value={sendData.firstName}

                                                                variant="outlined"
                                                                color="common"
                                                            />
                                                        </Stack>
                                                    </CardContent>
                                                </Card>
                                                <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                                                    <CardContent>
                                                        <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                            District/Taluk-ಜಿಲ್ಲೆ/ತಾಲೂಕು
                                                        </Typography>
                                                        <Stack mt={2} mb={2}>
                                                            <TextField
                                                                id="twoquestions"
                                                                label="Your Answer"
                                                                type="text"
                                                                disabled
                                                                value={sendData.district}

                                                                variant="outlined"
                                                                color="common"
                                                            />
                                                        </Stack>
                                                    </CardContent>
                                                </Card>
                                                <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                                                    <CardContent>
                                                        <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                            Taluk/ತಾಲೂಕು
                                                        </Typography>
                                                        <Stack mt={2} mb={2}>
                                                            <TextField
                                                                id="twoquestions"
                                                                label="Your Answer"
                                                                value={sendData.taluk}
                                                                disabled
                                                                variant="outlined"
                                                                color="common"
                                                            />
                                                        </Stack>
                                                    </CardContent>
                                                </Card>
                                                <Card style={{ marginTop: 10, borderRadius: 20 }}>
                                                    <CardContent>
                                                        <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                            Gram panchayat/ಗ್ರಾಮ ಪಂಚಾಯಿತಿ*
                                                        </Typography>
                                                        <Stack mt={2} mb={2}>
                                                            <TextField
                                                                id="grampanchayath"
                                                                label="Your Answer"
                                                                value={sendData.gram_panchayat}
                                                                variant="outlined"
                                                                color="common"
                                                                disabled
                                                            />
                                                        </Stack>
                                                    </CardContent>
                                                </Card>
                                                <Card style={{ marginTop: 10, borderRadius: 20 }}>
                                                    <CardContent>
                                                        <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                            Village name/ಗ್ರಾಮದ ಹೆಸರು
                                                        </Typography>
                                                        <Stack mt={2} mb={2}>
                                                            <TextField
                                                                id="skillsresources"
                                                                label="Your Answer"
                                                                disabled
                                                                value={sendData.village_name}
                                                                variant="outlined"
                                                                color="common"
                                                                disabled
                                                            />
                                                        </Stack>

                                                    </CardContent>
                                                </Card>
                                                <Card style={{ marginTop: 10, borderRadius: 20 }}>
                                                    <CardContent>
                                                        <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                            Total number of members in your household (adult)
                                                            ನಿಮ್ಮ ಮನೆಯ ಸದಸ್ಯರ ಒಟ್ಟು ಸಂಖ್ಯೆ
                                                        </Typography>
                                                        <Stack mt={2} mb={2}>
                                                            <TextField
                                                                type="text"
                                                                id="skillsresources"
                                                                label="Your Answer"
                                                                disabled
                                                                value={sendData.total_adults_no_of_member_household}
                                                                variant="outlined"
                                                                color="common"

                                                            />
                                                        </Stack>
                                                    </CardContent>
                                                </Card>
                                                <Card style={{ marginTop: 10, borderRadius: 20 }}>
                                                    <CardContent>
                                                        <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                            Total number of members in your household (children)
                                                        </Typography>
                                                        <Stack mt={2} mb={2}>
                                                            <TextField
                                                                type="text"
                                                                id="skillsresources"
                                                                label="Your Answer"
                                                                disabled
                                                                value={sendData?.numOfChildren}
                                                                variant="outlined"
                                                                color="common"
                                                            />
                                                        </Stack>
                                                    </CardContent>
                                                </Card>
                                                <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                                                    <CardContent>
                                                        <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                            House/ಮನೆ:
                                                        </Typography>
                                                        <Stack mt={2} mb={2}>
                                                            <TextField
                                                                id="twoquestions"
                                                                label="Your Answer"
                                                                type="text"
                                                                value={sendData?.house}
                                                                disabled
                                                                variant="outlined"
                                                                color="common"
                                                            />
                                                        </Stack>
                                                    </CardContent>
                                                </Card>
                                                <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                                                    <CardContent>
                                                        <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                            Roof/ಛಾವಣಿ:


                                                        </Typography>
                                                        <Stack mt={2} mb={2}>
                                                            <TextField
                                                                id="twoquestions"
                                                                label="Your Answer"
                                                                type="text"
                                                                value={sendData?.roof}
                                                                disabled
                                                                variant="outlined"
                                                                color="common"
                                                            />
                                                        </Stack>
                                                    </CardContent>
                                                </Card>
                                                <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                                                    <CardContent>
                                                        <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                            Ration card/ಪಡಿತರ ಚೀಟಿ:



                                                        </Typography>
                                                        <Stack mt={2} mb={2}>
                                                            <TextField
                                                                id="twoquestions"
                                                                label="Your Answer"
                                                                type="text"
                                                                value={sendData?.ration_card}
                                                                disabled
                                                                variant="outlined"
                                                                color="common"
                                                            />
                                                        </Stack>
                                                    </CardContent>
                                                </Card>
                                                <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                                                    <CardContent>
                                                        <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                            Caste Category/ಜಾತಿ ವರ್ಗ:
                                                        </Typography>
                                                        <Stack mt={2} mb={2}>
                                                            <TextField
                                                                id="twoquestions"
                                                                label="Your Answer"
                                                                type="text"
                                                                value={sendData?.caste_name}
                                                                variant="outlined"
                                                                color="common"
                                                                disabled
                                                            />
                                                        </Stack>
                                                    </CardContent>
                                                </Card>
                                                <Card style={{ marginTop: 10, borderRadius: 20 }}>
                                                    <CardContent>
                                                        <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                            Sub-caste name/ಉಪಜಾತಿ ಹೆಸರು

                                                        </Typography>
                                                        <Stack mt={2} mb={2}>
                                                            <TextField
                                                                id="grampanchayath"
                                                                label="Your Answer"
                                                                disabled
                                                                value={sendData?.sub_cast_name}
                                                                variant="outlined"
                                                                color="common"
                                                            />
                                                        </Stack>
                                                    </CardContent>
                                                </Card>
                                                <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                                                    <CardContent>
                                                        <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                            Religion/ಧರ್ಮ:
                                                        </Typography>
                                                        <Stack mt={2} mb={2}>
                                                            <TextField
                                                                id="twoquestions"
                                                                label="Your Answer"
                                                                type="text"
                                                                value={sendData?.religion}
                                                                disabled
                                                                variant="outlined"
                                                                color="common"
                                                            />
                                                        </Stack>
                                                    </CardContent>
                                                </Card>
                                                <Card style={{ marginTop: 10, borderRadius: 20 }}>
                                                    <CardContent>
                                                        <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                            Age/ವಯಸ್ಸು
                                                        </Typography>
                                                        <Stack mt={2} mb={2}>
                                                            <TextField
                                                                type="text"
                                                                id="twoquestions"
                                                                label="Your Answer"
                                                                value={sendData?.age}
                                                                variant="outlined"
                                                                color="common"
                                                                disabled
                                                            />
                                                        </Stack>
                                                    </CardContent>
                                                </Card>

                                                <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                                                    <CardContent>
                                                        <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                            Marital Status/ವೈವಾಹಿಕ ಸ್ಥಿತಿ
                                                        </Typography>
                                                        <Stack mt={2} mb={2}>
                                                            <TextField
                                                                id="twoquestions"
                                                                label="Your Answer"
                                                                type="text"
                                                                value={sendData?.marital_status}
                                                                disabled
                                                                variant="outlined"
                                                                color="common"
                                                            />
                                                        </Stack>
                                                    </CardContent>
                                                </Card>
                                                <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                                                    <CardContent>
                                                        <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                            Highest level of education completed
                                                            ಉನ್ನತ ಮಟ್ಟದ ಶಿಕ್ಷಣವನ್ನು ಪೂರ್ಣಗೊಳಿಸಲಾಗಿದೆ
                                                            :
                                                        </Typography>
                                                        <Stack mt={2} mb={2}>
                                                            <TextField
                                                                id="twoquestions"
                                                                label="Your Answer"
                                                                type="text"
                                                                value={sendData?.education}
                                                                disabled
                                                                variant="outlined"
                                                                color="common"
                                                            />
                                                        </Stack>
                                                    </CardContent>
                                                </Card>
                                                <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                                                    <CardContent>
                                                        <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                            Primary occupation (the work that you engage in for more than 6 months in a year)
                                                            ಪ್ರಾಥಮಿಕ ಉದ್ಯೋಗ (ಒಂದು ವರ್ಷದಲ್ಲಿ 6 ತಿಂಗಳಿಗಿಂತ ಹೆಚ್ಚು ಕಾಲ ನೀವು ತೊಡಗಿಸಿಕೊಂಡಿರುವ ಕೆಲಸ)



                                                        </Typography>
                                                        <Stack mt={2} mb={2}>
                                                            <TextField
                                                                id="twoquestions"
                                                                label="Your Answer"
                                                                type="text"
                                                                value={sendData?.primary_occupation_of_the_household}
                                                                disabled
                                                                variant="outlined"
                                                                color="common"
                                                            />
                                                        </Stack>
                                                    </CardContent>
                                                </Card>
                                                <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                                                    <CardContent>
                                                        <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                            Secondary Occupation of the Household/
                                                            ಕುಟುಂಬದ  ದ್ವಿತೀಯಕ ಉದ್ಯೋಗ

                                                        </Typography>
                                                        <Stack mt={2} mb={2}>
                                                            <TextField
                                                                id="twoquestions"
                                                                label="Your Answer"
                                                                type="text"
                                                                disabled
                                                                value={sendData?.secondary_occupation_of_the_household}
                                                                variant="outlined"
                                                                color="common"
                                                            />
                                                        </Stack>
                                                    </CardContent>
                                                </Card>
                                                <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                                                    <CardContent>
                                                        <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                            Women's Occupation/ಮಹಿಳಾ ಉದ್ಯೋಗ

                                                        </Typography>
                                                        <Stack mt={2} mb={2}>
                                                            <TextField
                                                                id="twoquestions"
                                                                label="Your Answer"
                                                                type="text" value={sendData?.womens_occupation}
                                                                variant="outlined"
                                                                color="common"
                                                                disabled
                                                            />
                                                        </Stack>
                                                    </CardContent>
                                                </Card>
                                                <Card mt={1} style={{ marginTop: 50, borderRadius: 20 }}>
                                                    <CardContent>
                                                        <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                            Monthly Women's income
                                                            *
                                                        </Typography>
                                                        <Stack mt={2} mb={2}>
                                                            <TextField
                                                                id="Email"
                                                                disabled
                                                                type="text"
                                                                label="Your answer"
                                                                value={sendData?.monthly_women_income}
                                                                variant="outlined"
                                                                color="common"
                                                            />
                                                        </Stack>
                                                    </CardContent>
                                                </Card>
                                                <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                                                    <CardContent>
                                                        <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                            What is the source of this income?

                                                        </Typography>
                                                        <Stack mt={2} mb={2}>
                                                            <TextField
                                                                id="twoquestions"
                                                                label="Your Answer"
                                                                type="text"
                                                                value={sendData?.source_of_this_income}
                                                                disabled
                                                                variant="outlined"
                                                                color="common"
                                                            />
                                                        </Stack>
                                                    </CardContent>
                                                </Card>
                                                <Card mt={1} style={{ marginTop: 50, borderRadius: 20 }}>
                                                    <CardContent>
                                                        <Typography variant="subtitle2" style={{ color: '#ff7424' }}>


                                                            Monthly household expenditure (in Rs)
                                                            ಮಾಸಿಕ ಮನೆಯ ಖರ್ಚು (ರೂ.ಗಳಲ್ಲಿ)
                                                            *
                                                        </Typography>
                                                        <Stack mt={2} mb={2}>
                                                            <TextField
                                                                id="Email"
                                                                disabled
                                                                label="Your answer"
                                                                type="text"
                                                                value={sendData.householdUse}
                                                                variant="outlined"
                                                                color="common"
                                                            />
                                                        </Stack>
                                                    </CardContent>
                                                </Card>
                                                <Card mt={1} style={{ marginTop: 50, borderRadius: 20 }}>
                                                    <CardContent>
                                                        <Typography variant="subtitle2" style={{ color: '#ff7424' }}>


                                                            Monthly household income(in Rs.)
                                                            ಮಾಸಿಕ ಮನೆಯ ಆದಾಯ(ರೂ.ಗಳಲ್ಲಿ)
                                                            *
                                                        </Typography>
                                                        <Stack mt={2} mb={2}>
                                                            <TextField
                                                                id="Email"
                                                                disabled
                                                                type="text"
                                                                label="Your answer"
                                                                value={sendData.income}

                                                                variant="outlined"
                                                                color="common"
                                                            />
                                                        </Stack>
                                                    </CardContent>
                                                </Card>
                                                <Card style={{ marginTop: 10, borderRadius: 20 }}>
                                                    <CardContent>
                                                        <Stack mt={2}>
                                                            <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                                Are you the sole earning member of your family?   (Yes/No)
                                                                /ನಿಮ್ಮ ಕುಟುಂಬದ ಏಕೈಕ ಗಳಿಕೆಯ ಸದಸ್ಯರಾಗಿದ್ದೀರಾ? (ಹೌದು/ಇಲ್ಲ)

                                                            </Typography>
                                                            <RadioGroup
                                                                aria-labelledby="demo-radio-buttons-group-label"
                                                                name="radio-buttons-group"

                                                                disabled
                                                                value={sendData.sole_earner_family}
                                                            >
                                                                <div style={{ display: "flex" }}>
                                                                    <FormControlLabel
                                                                        value="No"
                                                                        control={<Radio style={{ color: "#595959" }} />}
                                                                        disabled
                                                                        label="No"
                                                                    />
                                                                    <FormControlLabel
                                                                        value="Yes"
                                                                        control={<Radio style={{ color: "#595959" }} />}
                                                                        disabled
                                                                        label="Yes" />
                                                                </div>
                                                            </RadioGroup>
                                                        </Stack>
                                                    </CardContent>
                                                </Card>
                                                <Card >

                                                </Card>


                                            </CardContent>
                                        </Card>

                                        <Card style={{ marginTop: 10, borderRadius: 20 }}>
                                            <CardContent>
                                                <Stack mt={1}>
                                                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                        Day 2 Details

                                                    </Typography>



                                                </Stack>
                                            </CardContent>
                                        </Card>
                                        <Card style={{ marginTop: 10, borderRadius: 20 }}>
                                            <CardContent>


                                                <Stack mt={1}>
                                                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                        Has anyone in your household migrated in the last 1 year for work? Y/N/ನಿಮ್ಮ ಮನೆಯಲ್ಲಿ ಯಾರಾದರೂ ಕೆಲಸಕ್ಕಾಗಿ ಕಳೆದ 1 ವರ್ಷದಲ್ಲಿ ವಲಸೆ ಹೋಗಿದ್ದಾರೆಯೇ? ಹೌದು ಅಲ್ಲ</Typography>
                                                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>

                                                    </Typography>
                                                    <RadioGroup
                                                        aria-labelledby="demo-radio-buttons-group-label"
                                                        name="radio-buttons-group"
                                                        value={sendData.household_migration_last_year}
                                                        disabled
                                                    >
                                                        <div style={{ display: "flex" }}>
                                                            <FormControlLabel
                                                                value="No"
                                                                control={<Radio style={{ color: "#595959" }} />}
                                                                disabled
                                                                label="No"
                                                            />
                                                            <FormControlLabel
                                                                value="Yes"
                                                                control={<Radio style={{ color: "#595959" }} />}
                                                                disabled
                                                                label="Yes" />
                                                        </div>
                                                    </RadioGroup>
                                                </Stack>

                                            </CardContent>
                                        </Card>
                                        <Card style={{ marginTop: 10, borderRadius: 20 }}>
                                            <CardContent>
                                                <Stack mt={1}>
                                                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                        Does the migrant member send remittances to the household? Y/N
                                                        /ವಲಸಿಗ ಸದಸ್ಯರು ಮನೆಗೆ ಹಣ ಕಳುಹಿಸುತ್ತಾರೆಯೇ? ಹೌದು ಅಲ್ಲ</Typography>
                                                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>

                                                    </Typography>
                                                    <RadioGroup
                                                        value={sendData.migrant_sends_remittance}
                                                        aria-labelledby="demo-radio-buttons-group-label"
                                                        name="radio-buttons-group"
                                                        disabled

                                                    >
                                                        <div style={{ display: "flex" }}>
                                                            <FormControlLabel
                                                                value="No"
                                                                control={<Radio style={{ color: "#595959" }} />}
                                                                disabled
                                                                label="No"
                                                            />
                                                            <FormControlLabel
                                                                value="Yes"
                                                                control={<Radio style={{ color: "#595959" }} />}
                                                                disabled
                                                                label="Yes" />
                                                        </div>
                                                    </RadioGroup>
                                                </Stack>
                                            </CardContent>
                                        </Card>
                                        <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                                            <CardContent>
                                                <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                    Are the following liabilities or assets? / ಈ ಕೆಳಗಿನ ಹೊಣೆಗಾರಿಕೆಗಳು ಅಥವಾ ಸ್ವತ್ತುಗಳು?
                                                </Typography>
                                                <Stack mt={2} mb={2}>
                                                    <FormGroup>
                                                        {assestsOwned.map((item) => (
                                                            <FormControlLabel
                                                                key={item.id}
                                                                control={
                                                                    <Checkbox
                                                                        disabled
                                                                        color="primary"
                                                                        // Use optional chaining and fallback to an empty array
                                                                        checked={sendData.liabilities_or_assets?.includes(item.name) || false}

                                                                    />
                                                                }
                                                                label={item.name}
                                                            />
                                                        ))}
                                                    </FormGroup>
                                                </Stack>
                                            </CardContent>

                                        </Card>

                                        <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                                            <CardContent>
                                                <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                    Which of the following would you record as a book keeping entry? <br />
                                                    ಕೆಳಗಿನವುಗಳಲ್ಲಿ ಯಾವುದನ್ನು ನೀವು ಬುಕ್‌ಕೀಪಿಂಗ್ ನಮೂದು ಎಂದು ರೆಕಾರ್ಡ್ ಮಾಡುತ್ತೀರಿ?
                                                </Typography>
                                                <Stack mt={2} mb={2}>
                                                    <FormGroup>
                                                        {newBookkeepingEntries.map((item) => (
                                                            <FormControlLabel
                                                                key={item.id}
                                                                control={
                                                                    <Checkbox
                                                                        disabled
                                                                        color="primary"
                                                                        checked={sendData.bookkeeping_entry?.includes(item.name) || false}

                                                                    />
                                                                }
                                                                label={item.name}
                                                            />
                                                        ))}
                                                    </FormGroup>
                                                </Stack>
                                            </CardContent>
                                        </Card>

                                        <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                                            <CardContent>
                                                <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                    Please tell me if the following loans are productive or consumptive? <br />
                                                    ಈ ಕೆಳಗಿನ ಸಾಲಗಳು ಉತ್ಪಾದಕವೇ ಅಥವಾ ಉಪಭೋಗಕಾರಿಯೇ ಎಂದು ದಯವಿಟ್ಟು ನನಗೆ ತಿಳಿಸಿ?
                                                </Typography>
                                                <Stack mt={2} mb={2}>
                                                    <FormGroup>
                                                        {purposesForMoney.map((item) => (
                                                            <FormControlLabel
                                                                key={item.id}
                                                                control={
                                                                    <Checkbox
                                                                        color="primary"
                                                                        checked={sendData.loan_type.includes(item.name)}
                                                                        disabled
                                                                    />
                                                                }
                                                                label={item.name}
                                                            />
                                                        ))}
                                                    </FormGroup>
                                                </Stack>
                                            </CardContent>
                                        </Card>

                                        <Card style={{ marginTop: 10, borderRadius: 20 }}>
                                            <CardContent>
                                                <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                    You have taken a loan of Rs. 20,000 to be paid back in equal monthly payments in one year and you have to pay back Rs. 2000 a month. What is the annual interest rate?
                                                    20000ರೂ ಗಳನ್ನೂ ಸಾಲ ಮಾಡಿದ್ಧಿರ , ಒಂದು ವರ್ಷದಲ್ಲಿ ಸಮಾನ ಮಾಸಿಕ ಪಾವತಿಗಳಲ್ಲಿ 2000 ರೂ  ಮರುಪಾವತಿಸಿದರೆ ಮತ್ತು  ವಾರ್ಷಿಕ ಬಡ್ಡಿ ದರ ಎಷ್ಟು?
                                                </Typography>
                                                <Stack mt={2} mb={2}>
                                                    <TextField
                                                        id="twoquestions"
                                                        label="Your Answer"
                                                        value={sendData.annual_interest_rate}
                                                        disabled
                                                        type="text"

                                                        variant="outlined"
                                                        color="common"
                                                    />
                                                </Stack>
                                            </CardContent>
                                        </Card>
                                        <Card style={{ marginTop: 10, borderRadius: 20 }}>
                                            <CardContent>
                                                <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                    You lend Rs.1000 to a friend one evening and she gives you Rs. 1000 back the next day. If the interest is 2% per day, how much should he pay back in total tomorrow?
                                                    ನೀವು ಸ್ನೇಹಿತರಿಗೆ ಒಂದು ಸಂಜೆ 1000 ರೂ ಸಾಲ ನೀಡುತ್ತೀರಿ ಮತ್ತು ಅವಳು ಮರುದಿನ 1000 ರೂ ಮರು ಪಾವತಿ ಮಾಡುತ್ತಾರೆ ,ಒಂದು ದಿನಕ್ಕೆ ಬಡ್ಡಿ 2 % ಆದರೆ , ನಾಳೆ  ಅವರು ಒಟ್ಟು ಎಷ್ಟು ಮರುಪಾವತಿಸಬೇಕು?"</Typography>
                                                <Stack mt={2} mb={2}>
                                                    <TextField
                                                        id="twoquestions"
                                                        label="Your Answer"
                                                        value={sendData.interest_payment_due}

                                                        type="text"
                                                        disabled
                                                        variant="outlined"
                                                        color="common"
                                                    />
                                                </Stack>
                                            </CardContent>
                                        </Card>
                                        <Card style={{ marginTop: 10, borderRadius: 20 }}>
                                            <CardContent>
                                                <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                    Assume you invest Rs.15,000 as capital in a saree business for 30 sarees. You spend Rs.200 to transport the sarees from the wholesaler to your village. If you sell all the sarees for 21,000, how much profit have you made?
                                                    ನೀವು 30 ಸೀರೆಗಳಿಗೆ ಸೀರೆ ವ್ಯಾಪಾರದಲ್ಲಿ ರೂ.15,000 ಬಂಡವಾಳವಾಗಿ ಹೂಡಿಕೆ ಮಾಡುತ್ತೀರಿ ಎಂದು ಭಾವಿಸಿ. ಸಗಟು ವ್ಯಾಪಾರಿಯಿಂದ ನಿಮ್ಮ ಗ್ರಾಮಕ್ಕೆ ಸೀರೆಗಳನ್ನು ಸಾಗಿಸಲು ನೀವು 200 ರೂ. ಎಲ್ಲಾ ಸೀರೆಗಳನ್ನು 21,000ಕ್ಕೆ ಮಾರಿದರೆ ಎಷ್ಟು ಲಾಭಸಿಗುತ್ತದೆ ?
                                                </Typography>
                                                <Stack mt={2} mb={2}>

                                                    <TextField
                                                        id="twoquestions"
                                                        label="Your Answer"
                                                        value={sendData.profit_made}

                                                        type="text"
                                                        disabled
                                                        variant="outlined"
                                                        color="common"
                                                    />
                                                </Stack>
                                            </CardContent>
                                        </Card>
                                        <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                                            <CardContent>
                                                <Stack mt={1}>
                                                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>Personal Account/ವೈಯಕ್ತಿಕ ಖಾತೆ
                                                    </Typography> <Typography>

                                                    </Typography>
                                                    <RadioGroup
                                                        aria-labelledby="demo-radio-buttons-group-label"
                                                        name="radio-buttons-group"
                                                        value={sendData.personal_account}
                                                        disabled

                                                    >
                                                        <div style={{ display: "flex" }}>
                                                            <FormControlLabel
                                                                value="No"
                                                                control={<Radio style={{ color: "#595959" }} />}
                                                                disabled
                                                                label="No"
                                                            />
                                                            <FormControlLabel
                                                                value="Yes"
                                                                control={<Radio style={{ color: "#595959" }} />}
                                                                disabled
                                                                label="Yes" />
                                                        </div>
                                                    </RadioGroup>
                                                </Stack>
                                            </CardContent>
                                        </Card>
                                        <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                                            <CardContent>
                                                <Stack mt={1}>
                                                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>Do you have a personal bank account? (Y/N)/</Typography>ನೀವು ವೈಯಕ್ತಿಕ ಬ್ಯಾಂಕ್ ಖಾತೆಯನ್ನು ಹೊಂದಿದ್ದೀರಾ? (ಹೌದು/ಇಲ್ಲ) <Typography>

                                                    </Typography>
                                                    <RadioGroup
                                                        aria-labelledby="demo-radio-buttons-group-label"
                                                        name="radio-buttons-group"
                                                        value={sendData.has_personal_account}
                                                        disabled

                                                    >
                                                        <div style={{ display: "flex" }}>
                                                            <FormControlLabel
                                                                value="No"
                                                                control={<Radio style={{ color: "#595959" }} />}
                                                                disabled
                                                                label="No"
                                                            />
                                                            <FormControlLabel
                                                                value="Yes"
                                                                control={<Radio style={{ color: "#595959" }} />}
                                                                disabled
                                                                label="Yes" />
                                                        </div>
                                                    </RadioGroup>
                                                </Stack>
                                            </CardContent>
                                        </Card>

                                        <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                                            <CardContent>
                                                <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                    How often do you operate your bank account? <br />
                                                    ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಖಾತೆಯನ್ನು ನೀವು ಎಷ್ಟು ಬಾರಿ ನಿರ್ವಹಿಸುತ್ತೀರಿ?
                                                </Typography>
                                                <Stack mt={2} mb={2}>
                                                    <FormGroup>
                                                        {timeFrequencies.map((item) => (
                                                            <FormControlLabel
                                                                key={item.id}
                                                                control={
                                                                    <Checkbox
                                                                        color="primary"
                                                                        checked={sendData.bank_account_usage_frequency.includes(item.name)}
                                                                        disabled
                                                                    />
                                                                }
                                                                label={item.name}
                                                            />
                                                        ))}
                                                    </FormGroup>
                                                </Stack>
                                            </CardContent>
                                        </Card>


                                        <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                                            <CardContent>
                                                <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                    Who is responsible for day-to-day decisions about money in your household? <br />
                                                    ನಿಮ್ಮ ಮನೆಯಲ್ಲಿ ಹಣದ ಬಗ್ಗೆ ದಿನನಿತ್ಯದ ನಿರ್ಧಾರಗಳಿಗೆ ಯಾರು ಜವಾಬ್ದಾರರು?
                                                </Typography>
                                                <Stack mt={2} mb={2}>
                                                    <FormGroup>
                                                        {personalRelationships.map((item) => (
                                                            <FormControlLabel
                                                                key={item.id}
                                                                control={
                                                                    <Checkbox
                                                                        color="primary"
                                                                        checked={sendData.money_decision_maker.includes(item.name)}
                                                                        disabled
                                                                    />
                                                                }
                                                                label={item.name}
                                                            />
                                                        ))}
                                                    </FormGroup>
                                                </Stack>
                                            </CardContent>
                                        </Card>
                                        <Card style={{ marginTop: 10, borderRadius: 20 }}>
                                            <CardContent>
                                                <Stack mt={1}>
                                                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>Do you have a plan for monthly household expenses? Yes/No/Don't know
                                                        ಮಾಸಿಕ ಮನೆಯ ವೆಚ್ಚಗಳಿಗಾಗಿ ನೀವು ಯೋಜನೆಯನ್ನು ಹೊಂದಿದ್ದೀರಾ? ಹೌದು /ಇಲ್ಲ/ಗೊತ್ತಿಲ್ಲ</Typography>
                                                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>

                                                    </Typography>
                                                    <RadioGroup
                                                        aria-labelledby="demo-radio-buttons-group-label"
                                                        name="radio-buttons-group"
                                                        disabled
                                                        value={sendData.monthly_expense_plan}
                                                    >
                                                        <div style={{ display: "flex" }}>
                                                            <FormControlLabel
                                                                value="No"
                                                                control={<Radio style={{ color: "#595959" }} />}
                                                                disabled
                                                                label="No"
                                                                disabled
                                                            />
                                                            <FormControlLabel
                                                                value="Yes"
                                                                control={<Radio style={{ color: "#595959" }} />}
                                                                disabled
                                                                label="Yes"
                                                                disabled />
                                                            <FormControlLabel value="Don't know" control={<Radio style={{ color: "#595959" }} />}
                                                                disabled label="Don't know" />
                                                        </div>
                                                    </RadioGroup>
                                                </Stack>
                                            </CardContent>
                                        </Card>
                                        <Card style={{ marginTop: 10, borderRadius: 20 }}>
                                            <CardContent>
                                                <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                    How much does your monthly household expense plan come up to?
                                                    ನಿಮ್ಮ ಮಾಸಿಕ ಮನೆಯ ವೆಚ್ಚದ ಯೋಜನೆ ಎಷ್ಟು ಬರುತ್ತದೆ?

                                                </Typography>
                                                <Stack mt={2} mb={2}>
                                                    <TextField
                                                        id="twoquestions"
                                                        label="Your Answer"
                                                        value={sendData.monthly_expense_amount}

                                                        type="text"
                                                        disabled
                                                        variant="outlined"
                                                        color="common"
                                                    />
                                                </Stack>
                                            </CardContent>
                                        </Card>
                                        <Card style={{ marginTop: 10, borderRadius: 20 }}>
                                            <CardContent>
                                                <Stack mt={1}>
                                                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>Do you maintain a record of the daily household expenses by maintaining a book of accounts (Y/N)
                                                        ಖಾತೆಗಳ ಪುಸ್ತಕವನ್ನು (ಹೌದು /ಇಲ್ಲ) ನಿರ್ವಹಿಸುವ ಮೂಲಕ ನೀವು ದೈನಂದಿನ ಮನೆಯ ಖರ್ಚುಗಳ ದಾಖಲೆಯನ್ನು ನಿರ್ವಹಿಸುತ್ತೀರಾ
                                                    </Typography>
                                                    <Typography>

                                                    </Typography>
                                                    <RadioGroup
                                                        aria-labelledby="demo-radio-buttons-group-label"
                                                        name="radio-buttons-group"
                                                        disabled value={sendData.maintain_expense_record}
                                                    >
                                                        <div style={{ display: "flex" }}>
                                                            <FormControlLabel
                                                                value="No"
                                                                control={<Radio style={{ color: "#595959" }} />}
                                                                disabled
                                                                label="No"
                                                            />
                                                            <FormControlLabel
                                                                value="Yes"
                                                                control={<Radio style={{ color: "#595959" }} />}
                                                                disabled
                                                                label="Yes" />
                                                        </div>
                                                    </RadioGroup>
                                                </Stack>
                                            </CardContent>
                                        </Card>
                                        <Card style={{ marginTop: 10, borderRadius: 20 }}>
                                            <CardContent>
                                                <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                    Savings/ಉಳಿತಾಯ

                                                </Typography>

                                            </CardContent>
                                        </Card>
                                        <Card style={{ marginTop: 10, borderRadius: 20 }}>
                                            <CardContent>
                                                <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                    Do you have individual savings?
                                                    ನೀವು ವೈಯಕ್ತಿಕ ಉಳಿತಾಯವನ್ನು ಹೊಂದಿದ್ದೀರಾ?

                                                </Typography>
                                                <Stack mt={2} mb={2}>
                                                    <TextField
                                                        id="twoquestions"
                                                        label="Your Answer"
                                                        value={sendData.individual_savings}

                                                        type="text"

                                                        disabled
                                                        variant="outlined"
                                                        color="common"
                                                    />
                                                </Stack>
                                            </CardContent>
                                        </Card>
                                        <Card style={{ marginTop: 10, borderRadius: 20 }}>
                                            <CardContent>
                                                <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                    How much do you save in a month as an individual?
                                                    ಒಬ್ಬ ವ್ಯಕ್ತಿಯಾಗಿ ನೀವು ತಿಂಗಳಿಗೆ ಎಷ್ಟು ಉಳಿತಾಯ ಮಾಡುತ್ತೀರಿ?

                                                </Typography>
                                                <Stack mt={2} mb={2}>
                                                    <TextField
                                                        id="twoquestions"
                                                        label="Your Answer"
                                                        value={sendData.monthly_savings_individual}

                                                        type="text"
                                                        disabled
                                                        variant="outlined"
                                                        color="common"
                                                    />
                                                </Stack>
                                            </CardContent>
                                        </Card>
                                        <Card style={{ marginTop: 10, borderRadius: 20 }}>
                                            <CardContent>
                                                <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                    What is your household annual savings?
                                                    ನಿಮ್ಮ ಮನೆಯ ವಾರ್ಷಿಕ ಉಳಿತಾಯ ಎಷ್ಟು?

                                                </Typography>
                                                <Stack mt={2} mb={2}>
                                                    <TextField
                                                        id="twoquestions"
                                                        label="Your Answer"
                                                        value={sendData.annual_savings_household}

                                                        type="text"
                                                        disabled
                                                        variant="outlined"
                                                        color="common"
                                                    />
                                                </Stack>
                                            </CardContent>
                                        </Card>
                                        <Card style={{ marginTop: 10, borderRadius: 20 }}>
                                            <CardContent>
                                                <Stack mt={1}>
                                                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>Are you confident to spend your savings and income as you would like?
                                                        ನಿಮ್ಮ ಉಳಿತಾಯ ಮತ್ತು ಆದಾಯವನ್ನು ನೀವು ಬಯಸಿದಂತೆ ಖರ್ಚು ಮಾಡುವ ವಿಶ್ವಾಸವಿದೆಯೇ?
                                                    </Typography>
                                                    <Typography>

                                                    </Typography>
                                                    <RadioGroup
                                                        aria-labelledby="demo-radio-buttons-group-label"
                                                        name="radio-buttons-group"
                                                        value={sendData.confident_spend_savings}
                                                        disabled

                                                    >
                                                        <div style={{ display: "flex" }}>
                                                            <FormControlLabel
                                                                value="No"
                                                                control={<Radio style={{ color: "#595959" }} />}
                                                                disabled
                                                                label="No"
                                                            />
                                                            <FormControlLabel
                                                                value="Yes"
                                                                control={<Radio style={{ color: "#595959" }} />}
                                                                disabled
                                                                label="Yes" />
                                                        </div>
                                                    </RadioGroup>
                                                </Stack>
                                            </CardContent>
                                        </Card>

                                        <Card style={{ marginTop: 10, borderRadius: 20 }}>
                                            <CardContent>
                                                <Stack mt={1}>
                                                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}> Loans/ಸಾಲಗಳು
                                                    </Typography>
                                                    <Typography>

                                                    </Typography>
                                                    <RadioGroup
                                                        aria-labelledby="demo-radio-buttons-group-label"
                                                        name="radio-buttons-group"
                                                        value={sendData.loans}
                                                        disabled
                                                    >
                                                        <div style={{ display: "flex" }}>
                                                            <FormControlLabel
                                                                value="No"
                                                                control={<Radio style={{ color: "#595959" }} />}
                                                                disabled
                                                                label="No"
                                                            />
                                                            <FormControlLabel
                                                                value="Yes"
                                                                control={<Radio style={{ color: "#595959" }} />}
                                                                disabled
                                                                label="Yes" />
                                                        </div>
                                                    </RadioGroup>
                                                </Stack>
                                            </CardContent>
                                        </Card>


                                        <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                                            <CardContent>
                                                <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                    Who took the loan? <br />
                                                    ಯಾರು ಸಾಲ ತೆಗೆದುಕೊಂಡರು?
                                                </Typography>
                                                <Stack mt={2} mb={2}>
                                                    <FormGroup>
                                                        {familyRoles.map((item) => (
                                                            <FormControlLabel
                                                                key={item.id}
                                                                control={
                                                                    <Checkbox
                                                                        color="primary"
                                                                        checked={sendData.loan_taken_by.includes(item.name)}
                                                                        disabled
                                                                    />
                                                                }
                                                                label={item.name}
                                                            />
                                                        ))}
                                                    </FormGroup>
                                                </Stack>
                                            </CardContent>
                                        </Card>

                                        <Card style={{ marginTop: 10, borderRadius: 20 }}>
                                            <CardContent>
                                                <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                    Amount borrowed/ಸಾಲ ಪಡೆದ ಮೊತ್ತ
                                                </Typography>
                                                <Stack mt={2} mb={2}>
                                                    <TextField
                                                        id="twoquestions"
                                                        label="Your Answer"
                                                        value={sendData.amount_borrowed}

                                                        type="text"
                                                        disabled
                                                        variant="outlined"
                                                        color="common"
                                                    />
                                                </Stack>
                                            </CardContent>
                                        </Card>

                                        <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                                            <CardContent>
                                                <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                    Purpose of loan / ಸಾಲದ ಉದ್ದೇಶ
                                                </Typography>
                                                <Stack mt={2} mb={2}>
                                                    <FormGroup>
                                                        {loanPurposes.map((item) => (
                                                            <FormControlLabel
                                                                key={item.id}
                                                                control={
                                                                    <Checkbox
                                                                        color="primary"
                                                                        checked={sendData.purpose_of_loan.includes(item.name)}
                                                                        disabled
                                                                    />
                                                                }
                                                                label={item.name}
                                                            />
                                                        ))}
                                                    </FormGroup>
                                                </Stack>
                                            </CardContent>
                                        </Card>

                                        <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                                            <CardContent>
                                                <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                    Source / ಮೂಲ
                                                </Typography>
                                                <Stack mt={2} mb={2}>
                                                    <FormGroup>
                                                        {loanSources.map((item) => (
                                                            <FormControlLabel
                                                                key={item.id}
                                                                control={
                                                                    <Checkbox
                                                                        color="primary"
                                                                        checked={sendData.source.includes(item.name)}
                                                                        disabled
                                                                    />
                                                                }
                                                                label={item.name}
                                                            />
                                                        ))}
                                                    </FormGroup>
                                                </Stack>
                                            </CardContent>
                                        </Card>
                                        <Card style={{ marginTop: 10, borderRadius: 20 }}>
                                            <CardContent>
                                                <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                    Rate of Interest/ಬಡ್ಡಿ ದರ

                                                </Typography>
                                                <Stack mt={2} mb={2}>
                                                    <TextField
                                                        id="twoquestions"
                                                        label="Your Answer"

                                                        value={sendData.rate_of_interest}

                                                        type="text"
                                                        disabled
                                                        variant="outlined"
                                                        color="common"
                                                    />
                                                </Stack>
                                            </CardContent>
                                        </Card>
                                        <Card style={{ marginTop: 10, borderRadius: 20 }}>
                                            <CardContent>
                                                <Stack mt={1}>
                                                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>Sometimes, it may so happen that our living expenses go beyond our income? Has this happened in your household in the last one year?
                                                        ಕೆಲವೊಮ್ಮೆ, ನಮ್ಮ ಜೀವನ ವೆಚ್ಚಗಳು ನಮ್ಮ ಆದಾಯವನ್ನು ಮೀರಿ ಹೋಗಬಹುದು? ಕಳೆದ ಒಂದು ವರ್ಷದಲ್ಲಿ ಇದು ನಿಮ್ಮ ಮನೆಯಲ್ಲಿ ನಡೆದಿದೆಯೇ?
                                                    </Typography>
                                                    <Typography>

                                                    </Typography>
                                                    <RadioGroup
                                                        aria-labelledby="demo-radio-buttons-group-label"
                                                        name="radio-buttons-group"
                                                        value={sendData.expenses_exceed_income_last_year}
                                                        disabled
                                                    >
                                                        <div style={{ display: "flex" }}>
                                                            <FormControlLabel
                                                                value="No"
                                                                control={<Radio style={{ color: "#595959" }} />}
                                                                disabled
                                                                label="No"
                                                            />
                                                            <FormControlLabel
                                                                value="Yes"
                                                                control={<Radio style={{ color: "#595959" }} />}
                                                                disabled
                                                                label="Yes" />

                                                            <FormControlLabel value={1} control={<Radio style={{ color: "#595959" }} />}
                                                                disabled label="Don't Know" />
                                                        </div>
                                                    </RadioGroup>
                                                </Stack>
                                            </CardContent>
                                        </Card>
                                        <Card style={{ marginTop: 10, borderRadius: 20 }}>
                                            <CardContent>
                                                <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                    How did you meet these unexpected expenses?
                                                    ನೀವು  ಈ ಅನಿರೀಕ್ಷಿತ ವೆಚ್ಚಗಳನ್ನು  ಹೇಗೆ ಪೂರೈಸಿದ್ದೀರಿ?


                                                </Typography>
                                                <Stack mt={1}>
                                                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                        Borrowed money from money lender (Yes/No)
                                                        ಸಾಲಗಾರರಿಂದ ಹಣವನ್ನು ಎರವಲು ಪಡೆಯಲಾಗಿದೆ  (ಹೌದು / ಇಲ್ಲ)</Typography>
                                                    <Typography>

                                                    </Typography>
                                                    <RadioGroup
                                                        aria-labelledby="demo-radio-buttons-group-label"
                                                        name="radio-buttons-group"
                                                        value={sendData.borrowed_from_lender_a}
                                                        disabled
                                                    >
                                                        <div style={{ display: "flex" }}>
                                                            <FormControlLabel
                                                                value="No"
                                                                control={<Radio style={{ color: "#595959" }} />}
                                                                disabled
                                                                label="No"
                                                            />
                                                            <FormControlLabel
                                                                value="Yes"
                                                                control={<Radio style={{ color: "#595959" }} />}
                                                                disabled
                                                                label="Yes" />

                                                        </div>
                                                    </RadioGroup>
                                                </Stack>
                                                <Stack mt={1}>
                                                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                        Cut back expenses (Yes/No)
                                                        ವೆಚ್ಚಗಳನ್ನು ಕಡಿತಗೊಳಿಸಿ (ಹೌದು / ಇಲ್ಲ)
                                                    </Typography>
                                                    <Typography>

                                                    </Typography>
                                                    <RadioGroup
                                                        aria-labelledby="demo-radio-buttons-group-label"
                                                        name="radio-buttons-group"
                                                        value={sendData.reduce_expenses_a}
                                                        disabled
                                                    >
                                                        <div style={{ display: "flex" }}>
                                                            <FormControlLabel
                                                                value="No"
                                                                control={<Radio style={{ color: "#595959" }} />}
                                                                disabled
                                                                label="No"
                                                            />
                                                            <FormControlLabel
                                                                value="Yes"
                                                                control={<Radio style={{ color: "#595959" }} />}
                                                                disabled
                                                                label="Yes" />

                                                        </div>
                                                    </RadioGroup>
                                                </Stack>

                                                <Stack mt={1}>
                                                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                        Sell an asset (Yes/No)
                                                        ಆಸ್ತಿಯನ್ನು ಮಾರಾಟ ಮಾಡಿ (ಹೌದು / ಇಲ್ಲ)
                                                    </Typography>
                                                    <Typography>


                                                    </Typography>
                                                    <RadioGroup
                                                        aria-labelledby="demo-radio-buttons-group-label"
                                                        name="radio-buttons-group"
                                                        value={sendData.asset_sale_a}
                                                        disabled

                                                    >
                                                        <div style={{ display: "flex" }}>
                                                            <FormControlLabel
                                                                value="No"
                                                                control={<Radio style={{ color: "#595959" }} />}
                                                                disabled
                                                                label="No"
                                                            />
                                                            <FormControlLabel
                                                                value="Yes"
                                                                control={<Radio style={{ color: "#595959" }} />}
                                                                disabled
                                                                label="Yes" />

                                                        </div>
                                                    </RadioGroup>
                                                </Stack>
                                                <Stack mt={1}>
                                                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                        Worked over time (Yes/No)
                                                        ಹೆಚ್ಚು  ಕಾಲ ಕೆಲಸ ಮಾಡಿ(ಹೌದು / ಇಲ್ಲ)

                                                    </Typography>
                                                    <Typography>


                                                    </Typography>
                                                    <RadioGroup
                                                        aria-labelledby="demo-radio-buttons-group-label"
                                                        name="radio-buttons-group"
                                                        value={sendData.overtime_hours_a

                                                        }
                                                        disabled
                                                    >
                                                        <div style={{ display: "flex" }}>
                                                            <FormControlLabel
                                                                value="No"
                                                                control={<Radio style={{ color: "#595959" }} />}
                                                                disabled
                                                                label="No"
                                                            />
                                                            <FormControlLabel
                                                                value="Yes"
                                                                control={<Radio style={{ color: "#595959" }} />}
                                                                disabled
                                                                label="Yes" />

                                                        </div>
                                                    </RadioGroup>
                                                </Stack>
                                                <Stack mt={1}>
                                                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                        Pay my bills late/ did not pay my bills (Yes/No)
                                                        ನನ್ನ ಬಿಲ್‌ಗಳನ್ನು ತಡವಾಗಿ ಪಾವತಿಸಿ/ ನನ್ನ ಬಿಲ್‌ಗಳನ್ನು ಪಾವತಿಸಿಲ್ಲ (ಹೌದು / ಇಲ್ಲ)

                                                    </Typography>
                                                    <Typography>


                                                    </Typography>
                                                    <RadioGroup
                                                        aria-labelledby="demo-radio-buttons-group-label"
                                                        name="radio-buttons-group"
                                                        value={sendData.missed_payments_a}
                                                        disabled

                                                    >
                                                        <div style={{ display: "flex" }}>
                                                            <FormControlLabel
                                                                value="No"
                                                                control={<Radio style={{ color: "#595959" }} />}
                                                                disabled
                                                                label="No"
                                                            />
                                                            <FormControlLabel
                                                                value="Yes"
                                                                control={<Radio style={{ color: "#595959" }} />}
                                                                disabled
                                                                label="Yes" />

                                                        </div>
                                                    </RadioGroup>
                                                </Stack>
                                                <Stack mt={1}>
                                                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                        Borrowed money from friends/relatives/neighbours (Yes/No)
                                                        ಸ್ನೇಹಿತರು/ಬಂಧುಗಳು/ನೆರೆಹೊರೆಯವರಿಂದ ಹಣವನ್ನು ಎರವಲು ಪಡೆಯಲಾಗಿದೆ  ಪಡೆಯಲಾಗಿದೆ (ಹೌದು / ಇಲ್ಲ)

                                                    </Typography>
                                                    <Typography>


                                                    </Typography>
                                                    <RadioGroup
                                                        aria-labelledby="demo-radio-buttons-group-label"
                                                        name="radio-buttons-group"
                                                        value={sendData.borrowed_from_others_a}
                                                        disabled

                                                    >
                                                        <div style={{ display: "flex" }}>
                                                            <FormControlLabel
                                                                value="No"
                                                                control={<Radio style={{ color: "#595959" }} />}
                                                                disabled
                                                                label="No"
                                                            />
                                                            <FormControlLabel
                                                                value="Yes"
                                                                control={<Radio style={{ color: "#595959" }} />}
                                                                disabled
                                                                label="Yes" />

                                                        </div>
                                                    </RadioGroup>
                                                </Stack>


                                                <Stack mt={1}>
                                                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                        Borrowed from my SHG (Yes/No)
                                                        ನನ್ನ ಸ್ವ ಸಹಾಯ ಸಂಘದಿಂದ ಎರವಲು ಪಡೆಯಲಾಗಿದೆ (ಹೌದು / ಇಲ್ಲ)



                                                    </Typography>
                                                    <Typography>


                                                    </Typography>
                                                    <RadioGroup
                                                        value={sendData.borrowed_from_shg_a}
                                                        aria-labelledby="demo-radio-buttons-group-label"
                                                        name="radio-buttons-group"
                                                        disabled
                                                    >
                                                        <div style={{ display: "flex" }}>
                                                            <FormControlLabel
                                                                value="No"
                                                                control={<Radio style={{ color: "#595959" }} />}
                                                                disabled
                                                                label="No"
                                                            />
                                                            <FormControlLabel
                                                                value="Yes"
                                                                control={<Radio style={{ color: "#595959" }} />}
                                                                disabled
                                                                label="Yes" />

                                                        </div>
                                                    </RadioGroup>
                                                </Stack>

                                                <Stack mt={1}>
                                                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                        Pawn something that I own (Yes/No)
                                                        ನಾನು ಹೊಂದಿರುವ ಯಾವುದನ್ನಾದರೂ ಗಿರವಿ ಇಡುತ್ತೇನೆ (Y/N)




                                                    </Typography>
                                                    <Typography>


                                                    </Typography>
                                                    <RadioGroup
                                                        aria-labelledby="demo-radio-buttons-group-label"
                                                        name="radio-buttons-group"
                                                        value={sendData.pawned_item_a}
                                                        disabled
                                                    >
                                                        <div style={{ display: "flex" }}>
                                                            <FormControlLabel
                                                                value="No"
                                                                control={<Radio style={{ color: "#595959" }} />}
                                                                disabled
                                                                label="No"
                                                            />
                                                            <FormControlLabel
                                                                value="Yes"
                                                                control={<Radio style={{ color: "#595959" }} />}
                                                                disabled
                                                                label="Yes" />

                                                        </div>
                                                    </RadioGroup>
                                                </Stack>

                                                <Stack mt={1}>
                                                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>

                                                        Took a loan from the bank (Yes/No)
                                                        ಬ್ಯಾಂಕಿನಿಂದ ಸಾಲವನ್ನು ತೆಗೆದುಕೊಂಡಿದ್ದಾರೆ (Y/N)



                                                    </Typography>
                                                    <Typography>


                                                    </Typography>
                                                    <RadioGroup
                                                        aria-labelledby="demo-radio-buttons-group-label"
                                                        name="radio-buttons-group"
                                                        value={sendData.bank_loan_a}
                                                        disabled
                                                    >
                                                        <div style={{ display: "flex" }}>
                                                            <FormControlLabel
                                                                value="No"
                                                                control={<Radio style={{ color: "#595959" }} />}
                                                                disabled
                                                                label="No"
                                                            />
                                                            <FormControlLabel
                                                                value="Yes"
                                                                control={<Radio style={{ color: "#595959" }} />}
                                                                disabled
                                                                label="Yes" />
                                                        </div>
                                                    </RadioGroup>
                                                </Stack>
                                            </CardContent>
                                        </Card>

                                        <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                                            <CardContent>
                                                <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                    If you lost your income, how long could you manage without borrowing money? <br />
                                                    ನೀವು ನಿಮ್ಮ ಆದಾಯವನ್ನು ಕಳೆದುಕೊಂಡರೆ, ಹಣವನ್ನು ಎರವಲು ಪಡೆಯದೆ ನೀವು ಎಷ್ಟು ದಿನ ನಿರ್ವಹಿಸಬಹುದು?
                                                </Typography>
                                                <Stack mt={2} mb={2}>
                                                    <FormGroup>
                                                        {timeDurations.map((item) => (
                                                            <FormControlLabel
                                                                key={item.id}
                                                                control={
                                                                    <Checkbox
                                                                        color="primary"
                                                                        checked={sendData.income_loss_duration.includes(item.name)}
                                                                        disabled
                                                                    />
                                                                }
                                                                label={item.name}
                                                            />
                                                        ))}
                                                    </FormGroup>
                                                </Stack>
                                            </CardContent>
                                        </Card>

                                        <Card style={{ marginTop: 10, borderRadius: 20 }}>
                                            <CardContent>
                                                <Typography variant="subtitle2" style={{ color: '#ff7424', textAlign: "center" }}>
                                                    Goals/ಗುರಿಗಳು
                                                </Typography>

                                            </CardContent>
                                        </Card>
                                        <Card style={{ marginTop: 10, borderRadius: 20 }}>
                                            <CardContent>
                                                <Stack mt={1}>
                                                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>Do you set short term and long-term financial goals and try to achieve them (Yes/No)
                                                        ನೀವು ಅಲ್ಪಾವಧಿಯ ಮತ್ತು ದೀರ್ಘಾವಧಿಯ ಹಣಕಾಸಿನ ಗುರಿಗಳನ್ನು ಹೊಂದುತ್ತೀರಾ ಮತ್ತು ಅವುಗಳನ್ನು ಸಾಧಿಸಲು ಪ್ರಯತ್ನಿಸುತ್ತೀರಾ (ಹೌದು /ಇಲ್ಲ)


                                                    </Typography>
                                                    <Typography>


                                                    </Typography>
                                                    <RadioGroup
                                                        aria-labelledby="demo-radio-buttons-group-label"
                                                        name="radio-buttons-group"
                                                        value={sendData.financial_goals_set}
                                                        disabled

                                                    >
                                                        <div style={{ display: "flex" }}>
                                                            <FormControlLabel
                                                                value="No"
                                                                control={<Radio style={{ color: "#595959" }} />}
                                                                disabled
                                                                label="No"
                                                            />
                                                            <FormControlLabel
                                                                value="Yes"
                                                                control={<Radio style={{ color: "#595959" }} />}
                                                                disabled
                                                                label="Yes" />
                                                        </div>
                                                    </RadioGroup>
                                                </Stack>
                                            </CardContent>
                                        </Card>
                                        <Card style={{ marginTop: 10, borderRadius: 20 }}>
                                            <CardContent>
                                                <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                    Could you share a short-term goal that you have set for yourself?
                                                    ನೀವು  ನಿಮಗಾಗಿ  ಹೊಂದಿಸಿರುವ ಅಲ್ಪಾವಧಿಯ ಗುರಿಯನ್ನು ನೀವು ಹಂಚಿಕೊಳ್ಳಬಹುದೇ?
                                                </Typography>
                                                <Stack mt={2} mb={2}>
                                                    <TextField
                                                        id="twoquestions"
                                                        label="Your Answer"
                                                        value={sendData.short_term_goal}
                                                        disabled
                                                        variant="outlined"
                                                        color="common"
                                                    />
                                                </Stack>
                                            </CardContent>
                                        </Card>
                                        <Card style={{ marginTop: 10, borderRadius: 20 }}>
                                            <CardContent>
                                                <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                    Could you share one long term goal that you have set for yourself? ……………………………………..
                                                    ನೀವು  ನಿಮಗಾಗಿ  ಹೊಂದಿಸಿದ ಒಂದು ದೀರ್ಘಾವಧಿಯ ಗುರಿಯನ್ನು ನೀವು ಹಂಚಿಕೊಳ್ಳಬಹುದೇ? ………………………………………….
                                                </Typography>
                                                <Stack mt={2} mb={2}>
                                                    <TextField
                                                        id="twoquestions"
                                                        label="Your Answer"
                                                        value={sendData.long_term_goal}
                                                        disabled
                                                        variant="outlined"
                                                        color="common"
                                                    />
                                                </Stack>
                                            </CardContent>
                                        </Card>

                                        <Card style={{ marginTop: 10, borderRadius: 20 }}>
                                            <CardContent>
                                                <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                    Enterprise/ಉದ್ಯಮ
                                                </Typography>

                                            </CardContent>
                                        </Card>
                                        <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                                            <CardContent>
                                                <Stack mt={1}>
                                                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>Does your family own/run a business or an enterprise?
                                                        ನಿಮ್ಮ ಕುಟುಂಬವು ವ್ಯಾಪಾರ ಅಥವಾ ಉದ್ಯಮವನ್ನು ಹೊಂದಿದೆಯೇ / ನಡೆಸುತ್ತಿದೆಯೇ?

                                                    </Typography>
                                                    <Typography>


                                                    </Typography>
                                                    <RadioGroup
                                                        aria-labelledby="demo-radio-buttons-group-label"
                                                        value={sendData.family_business}
                                                        name="radio-buttons-group"
                                                        disabled
                                                    >
                                                        <div style={{ display: "flex" }}>
                                                            <FormControlLabel
                                                                value="No"
                                                                control={<Radio style={{ color: "#595959" }} />}
                                                                disabled

                                                                label="No"
                                                            />
                                                            <FormControlLabel
                                                                value="Yes"
                                                                control={<Radio style={{ color: "#595959" }} />}
                                                                disabled
                                                                label="Yes" />
                                                        </div>
                                                    </RadioGroup>
                                                </Stack>
                                            </CardContent>
                                        </Card>
                                        {(sendData?.family_business == "No") ?
                                            <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                                                <CardContent>
                                                    <Stack mt={1}>
                                                        <Typography variant="subtitle2" style={{ color: '#ff7424' }}>If no, would you want to start an enterprise of your own?
                                                            ಇಲ್ಲದಿದ್ದರೆ, ನಿಮ್ಮದೇ ಆದ ಉದ್ಯಮವನ್ನು ಪ್ರಾರಂಭಿಸಲು ನೀವು ಬಯಸುವಿರಾ?
                                                        </Typography>
                                                        <Typography>


                                                        </Typography>
                                                        <RadioGroup
                                                            aria-labelledby="demo-radio-buttons-group-label"
                                                            name="radio-buttons-group"
                                                            disabled
                                                            value={sendData.want_to_start_enterprise}

                                                        >
                                                            <div style={{ display: "flex" }}>
                                                                <FormControlLabel
                                                                    value="No"
                                                                    control={<Radio style={{ color: "#595959" }} />}
                                                                    disabled
                                                                    label="No"
                                                                />
                                                                <FormControlLabel
                                                                    value="Yes"
                                                                    control={<Radio style={{ color: "#595959" }} />}
                                                                    disabled
                                                                    label="Yes" />
                                                            </div>
                                                        </RadioGroup>
                                                    </Stack>
                                                </CardContent>
                                            </Card>
                                            :
                                            null
                                        }

                                        {
                                            (sendData?.family_business == "Yes") ?
                                                <>
                                                    <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>

                                                        <CardContent>
                                                            <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                                What is the type of the enterprise? <br />
                                                                ಉದ್ಯಮದ ಪ್ರಕಾರ ಯಾವುದು?
                                                            </Typography>
                                                            <Stack mt={2} mb={2}>
                                                                <FormGroup>
                                                                    {businessTypes.map((item) => (
                                                                        <FormControlLabel
                                                                            key={item.id}
                                                                            control={
                                                                                <Checkbox
                                                                                    color="primary"
                                                                                    checked={sendData.enterprise_type.includes(item.name)}
                                                                                    disabled
                                                                                />
                                                                            }
                                                                            label={item.name}
                                                                        />
                                                                    ))}
                                                                </FormGroup>
                                                            </Stack>
                                                        </CardContent>
                                                    </Card>
                                                    <>


                                                        <Card style={{ marginTop: 10, borderRadius: 20 }}>
                                                            <CardContent>
                                                                <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                                    How many people are employed in the enterprise (paid workers) ………………..
                                                                    ಎಂಟರ್‌ಪ್ರೈಸ್‌ನಲ್ಲಿ ಎಷ್ಟು ಜನರು ಕೆಲಸ ಮಾಡುತ್ತಿದ್ದಾರೆ (ಪಾವತಿಸಿದ ಕೆಲಸಗಾರರು) …………………….
                                                                </Typography>
                                                                <Stack mt={2} mb={2}>
                                                                    <TextField
                                                                        id="twoquestions"
                                                                        label="Your Answer"
                                                                        type="text"
                                                                        disabled
                                                                        variant="outlined"
                                                                        color="common"
                                                                        value={sendData?.num_employees_paid}
                                                                    />
                                                                </Stack>
                                                            </CardContent>
                                                        </Card>
                                                        <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                                                            <CardContent>
                                                                <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                                    What is the nature of your individual involvement in the enterprise/business?
                                                                    ಉದ್ಯಮ/ವ್ಯವಹಾರದಲ್ಲಿ ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ಒಳಗೊಳ್ಳುವಿಕೆಯ ಸ್ವರೂಪವೇನು?

                                                                    <Card style={{ marginTop: 10, borderRadius: 20 }}>
                      <CardContent>
                        <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                        Are you named officially as one of the owners of the enterprise?
                        ನಿಮ್ಮ ಹೆಸರನ್ನು  ಯಾವುದಾದರೂ ಉದ್ಯಮದಲ್ಲಿ ಗುರುತಿಸಿ ಕೊಂಡಿದ್ದೀರಾ?

                        </Typography>
                        <Stack mt={2} mb={2}>
                          <TextField
                          disabled
                            id="twoquestions"
                            label="Your Answer"
                         value={sendData?.financial_goals_set_c}
                            variant="outlined"
                            color="common"
                          />
                        </Stack>
                      </CardContent>
                    </Card>

                                                                    <Card style={{ marginTop: 10, borderRadius: 20 }}>
                                                                        <CardContent>
                                                                            <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                                                Do you work along with other paid workers in the enterprise?
                                                                                ನಿಮ್ಮ ಉದ್ಯಮದ ಜೊತೆ ದಿನಗೂಲಿ ನೌಕರರ ಜೊತೆ ಕಾರ್ಯ ನಿರ್ವಹಿಸುತ್ತಿದ್ಧೀರ?

                                                                            </Typography>
                                                                            <Stack mt={2} mb={2}>
                                                                                <TextField
                                                                                    id="twoquestions"
                                                                                    label="Your Answer"
                                                                                    value={sendData?.collaborate_with_workers_c}
                                                                                    variant="outlined"
                                                                                    color="common"
                                                                                />
                                                                            </Stack>
                                                                        </CardContent>
                                                                    </Card>
                                                                    <Card style={{ marginTop: 10, borderRadius: 20 }}>
                                                                        <CardContent>
                                                                            <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                                                Are you responsible for managing the daily affairs of the enterprise?
                                                                                ನೀವು ಉದ್ಯಮದ  ದೈನಂದಿನ ವ್ಯವಹಾರಗಳನ್ನು ನಿರ್ವಹಿಸಲು  ಜವಾಬ್ದಾರರಾಗಿದ್ದೀರಾ?
                                                                            </Typography>
                                                                            <Stack mt={2} mb={2}>
                                                                                <TextField
                                                                                    id="twoquestions"
                                                                                    label="Your Answer"
                                                                                    value={sendData?.daily_affairs_management_c}
                                                                                    disabled
                                                                                    variant="outlined"
                                                                                    color="common"
                                                                                />
                                                                            </Stack>
                                                                        </CardContent>
                                                                    </Card>
                                                                    <Card style={{ marginTop: 10, borderRadius: 20 }}>
                                                                        <CardContent>
                                                                            <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                                                Do you take important financial decisions?
                                                                                ನೀವು ಪ್ರಮುಖ ಹಣಕಾಸಿನ ನಿರ್ಧಾರಗಳನ್ನು ತೆಗೆದುಕೊಳ್ಳುತ್ತೀರಾ?

                                                                            </Typography>
                                                                            <Stack mt={2} mb={2}>
                                                                                <TextField
                                                                                    id="twoquestions"
                                                                                    label="Your Answer"
                                                                                    value={sendData?.financial_decision_maker_c}
                                                                                    variant="outlined"
                                                                                    color="common"
                                                                                />
                                                                            </Stack>
                                                                        </CardContent>
                                                                    </Card>
                                                                    <Card style={{ marginTop: 10, borderRadius: 20 }}>
                                                                        <CardContent>
                                                                            <Typography variant="subtitle2" style={{ color: '#ff7424' }}>

                                                                                Do you maintain a daily book of accounts?
                                                                                ನೀವು ದೈನಂದಿನ ಹಣಕಾಸಿನ ಖಾತೆಗಳ ಪುಸ್ತಕವನ್ನು ನಿರ್ವಹಿಸುತ್ತೀರಾ?
                                                                            </Typography>
                                                                            <Stack mt={2} mb={2}>
                                                                                <TextField
                                                                                    id="twoquestions"
                                                                                    label="Your Answer"
                                                                                    disabled
                                                                                    value={sendData?.daily_accounts_book_c}
                                                                                    variant="outlined"
                                                                                    color="common"
                                                                                />
                                                                            </Stack>
                                                                        </CardContent>
                                                                    </Card>
                                                                </Typography>

                                                            </CardContent>
                                                        </Card>
                                                        <Card style={{ marginTop: 10, borderRadius: 20 }}>
                                                            <CardContent>
                                                                <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                                    What is the monthly income of the enterprise?  ಉದ್ಯಮದ ಮಾಸಿಕ ಆದಾಯ ಎಷ್ಟು?
                                                                </Typography>
                                                                <Stack mt={2} mb={2}>
                                                                    <TextField
                                                                        id="twoquestions"
                                                                        label="Your Answer"
                                                                        type="text"
                                                                        disabled
                                                                        value={sendData?.enterprise_monthly_income}
                                                                        variant="outlined"
                                                                        color="common"
                                                                    />
                                                                </Stack>
                                                            </CardContent>
                                                        </Card>
                                                        <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                                                            <CardContent>
                                                                <Stack mt={1}>
                                                                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>  Is the enterprise currently making profits?  ಉದ್ಯಮವು ಪ್ರಸ್ತುತ ಲಾಭ ಗಳಿಸುತ್ತಿದೆಯೇ?


                                                                    </Typography>
                                                                    <Select
                                                                        value={sendData.enterprise_is_profitable}
                                                                        disabled
                                                                        variant="standard"
                                                                        style={{ marginTop: 10 }}
                                                                    >
                                                                        <MenuItem value="">

                                                                        </MenuItem>
                                                                        <MenuItem value="Yes">Yes</MenuItem>
                                                                        <MenuItem value="No">No</MenuItem>
                                                                    </Select>

                                                                </Stack>
                                                            </CardContent>
                                                        </Card>
                                                        <Card style={{ marginTop: 10, borderRadius: 20 }}>
                                                            <CardContent>
                                                                <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                                    What is your profit per month?  ತಿಂಗಳಿಗೆ ನಿಮ್ಮ ಲಾಭ ಎಷ್ಟು?
                                                                </Typography>
                                                                <Stack mt={2} mb={2}>
                                                                    <TextField
                                                                        id="twoquestions"
                                                                        label="Your Answer"
                                                                        type="text"
                                                                        disabled
                                                                        value={sendData?.monthly_profit}
                                                                        variant="outlined"
                                                                        color="common"
                                                                    />
                                                                </Stack>
                                                            </CardContent>
                                                        </Card>
                                                        {/* <Card style={{ marginTop: 10, borderRadius: 20 }}>
                <CardContent>
                  <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                    Do you want start an enterprise of your own?  ನಿಮ್ಮ ಸ್ವಂತ ಉದ್ಯಮವನ್ನು ಪ್ರಾರಂಭಿಸಲು ನೀವು ಬಯಸುವಿರಾ?
                  </Typography>
                  <Stack mt={2} mb={2}>
                    <TextField
                      id="twoquestions"
                      label="Your Answer"
                    
                      variant="outlined"
                      color="common"
                    />
                  </Stack>
                </CardContent>
              </Card> */}

                                                    </>

                                                </>
                                                : null
                                        }


                                        {

                                            (sendData?.want_to_start_enterprise == "No") ?

                                                <>
                                                    <Card style={{ marginTop: 10, borderRadius: 20 }}>
                                                        <CardContent>
                                                            <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                                Do you have a say in making decisions on:  ನಿರ್ಧಾರಗಳನ್ನು ತೆಗೆದುಕೊಳ್ಳುವಲ್ಲಿ ನಿಮ್ಮ ಅಭಿಪ್ರಾಯವಿದೆಯೇ:
                                                            </Typography>
                                                            <Stack mt={1}>
                                                                <Typography variant="subtitle2" style={{ color: '#ff7424' }}>Education of children (Yes/No)  ಮಕ್ಕಳ ಶಿಕ್ಷಣ (ಹೌದು/ಇಲ್ಲ)
                                                                </Typography>
                                                                <Typography>

                                                                </Typography>
                                                                <RadioGroup
                                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                                    name="radio-buttons-group"
                                                                    value={sendData.children_education_b}
                                                                    disabled
                                                                >
                                                                    <div style={{ display: "flex" }}>
                                                                        <FormControlLabel
                                                                            value="No"
                                                                            control={<Radio style={{ color: "#595959" }} />}
                                                                            disabled
                                                                            label="No"
                                                                        />
                                                                        <FormControlLabel
                                                                            value="Yes"
                                                                            control={<Radio style={{ color: "#595959" }} />}
                                                                            disabled
                                                                            label="Yes" />
                                                                    </div>
                                                                </RadioGroup>
                                                            </Stack>
                                                            <Stack mt={1}>
                                                                <Typography variant="subtitle2" style={{ color: '#ff7424' }}>Access to health services (Yes/No)   ಆರೋಗ್ಯ ಸೇವೆಗಳಿಗೆ ಪ್ರವೇಶ (ಹೌದು/ಇಲ್ಲ)
                                                                </Typography>
                                                                <Typography>

                                                                </Typography>
                                                                <RadioGroup
                                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                                    name="radio-buttons-group"
                                                                    value={sendData.health_services_access_b}
                                                                    disabled
                                                                >
                                                                    <div style={{ display: "flex" }}>
                                                                        <FormControlLabel
                                                                            value="No"
                                                                            control={<Radio style={{ color: "#595959" }} />}
                                                                            disabled
                                                                            label="No"
                                                                        />
                                                                        <FormControlLabel
                                                                            value="Yes"
                                                                            control={<Radio style={{ color: "#595959" }} />}
                                                                            disabled
                                                                            label="Yes" />
                                                                    </div>
                                                                </RadioGroup>
                                                            </Stack>
                                                            <Stack mt={1}>
                                                                <Typography variant="subtitle2" style={{ color: '#ff7424' }}>Taking credit (Yes/No)     ಸಾಲ ತೆಗೆದುಕೊಳ್ಳುವುದು (ಹೌದು/ಇಲ್ಲ)

                                                                </Typography>
                                                                <Typography>


                                                                </Typography>
                                                                <RadioGroup
                                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                                    name="radio-buttons-group"
                                                                    value={sendData.taking_credit_b}
                                                                    disabled
                                                                >
                                                                    <div style={{ display: "flex" }}>
                                                                        <FormControlLabel
                                                                            value="No"
                                                                            control={<Radio style={{ color: "#595959" }} />}
                                                                            disabled
                                                                            label="No"
                                                                        />
                                                                        <FormControlLabel
                                                                            value="Yes"
                                                                            control={<Radio style={{ color: "#595959" }} />}
                                                                            disabled
                                                                            label="Yes" />
                                                                    </div>
                                                                </RadioGroup>
                                                            </Stack>
                                                            <Stack mt={1}>
                                                                <Typography variant="subtitle2" style={{ color: '#ff7424' }}>Saving money (Yes/No)   ಹಣ ಉಳಿತಾಯ (ಹೌದು/ಇಲ್ಲ)
                                                                </Typography>
                                                                <Typography>

                                                                </Typography>
                                                                <RadioGroup
                                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                                    name="radio-buttons-group"
                                                                    value={sendData.saving_money_b}
                                                                    disabled
                                                                >
                                                                    <div style={{ display: "flex" }}>
                                                                        <FormControlLabel
                                                                            value="No"
                                                                            control={<Radio style={{ color: "#595959" }} />}
                                                                            disabled
                                                                            label="No"
                                                                        />
                                                                        <FormControlLabel
                                                                            value="Yes"
                                                                            control={<Radio style={{ color: "#595959" }} />}
                                                                            disabled
                                                                            label="Yes" />
                                                                    </div>
                                                                </RadioGroup>
                                                            </Stack>
                                                            <Stack mt={1}>
                                                                <Typography style={{ fontWeight: 500 }}>
                                                                    Asset purchase (Yes/No) ಆಸ್ತಿ ಖರೀದಿ (ಹೌದು/ಇಲ್ಲ)
                                                                </Typography>
                                                                <Typography>
                                                                </Typography>
                                                                <RadioGroup
                                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                                    name="radio-buttons-group"
                                                                    value={sendData.asset_purchase_b} // Bind the value to "Yes" or "No"
                                                                    disabled
                                                                >
                                                                    <div style={{ display: "flex" }}>
                                                                        <FormControlLabel
                                                                            value="No"
                                                                            control={<Radio style={{ color: "#595959" }} />}
                                                                            disabled
                                                                            label="No"
                                                                        />
                                                                        <FormControlLabel
                                                                            value="Yes"
                                                                            control={<Radio style={{ color: "#595959" }} />}
                                                                            disabled
                                                                            label="Yes"
                                                                        />
                                                                    </div>
                                                                </RadioGroup>
                                                            </Stack>
                                                            <Stack mt={1}>
                                                                <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                                    Day-to-day expenditure (Yes/No)    ದಿನನಿತ್ಯದ ಖರ್ಚು (ಹೌದು/ಇಲ್ಲ)
                                                                </Typography>
                                                                <Typography>

                                                                </Typography>
                                                                <RadioGroup
                                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                                    name="radio-buttons-group"
                                                                    value={sendData.daily_expenditure_b}
                                                                    disabled
                                                                >
                                                                    <div style={{ display: "flex" }}>
                                                                        <FormControlLabel
                                                                            value="No"
                                                                            control={<Radio style={{ color: "#595959" }} />}
                                                                            disabled
                                                                            label="No"
                                                                        />
                                                                        <FormControlLabel
                                                                            value="Yes"
                                                                            control={<Radio style={{ color: "#595959" }} />}
                                                                            disabled
                                                                            label="Yes" />
                                                                    </div>
                                                                </RadioGroup>
                                                            </Stack>
                                                            <Stack mt={1}>
                                                                <Typography variant="subtitle2" style={{ color: '#ff7424' }}>Day-to-day running an enterprise (Yes/No)    ದಿನದಿಂದ ದಿನಕ್ಕೆ ಉದ್ಯಮವನ್ನು ನಡೆಸುವುದು (ಹೌದು/ಇಲ್ಲ)
                                                                </Typography>
                                                                <Typography>
                                                                </Typography>
                                                                <RadioGroup
                                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                                    name="radio-buttons-group"
                                                                    value={sendData.operational_management_b}
                                                                    disabled
                                                                >
                                                                    <div style={{ display: "flex" }}>
                                                                        <FormControlLabel
                                                                            value="No"
                                                                            control={<Radio style={{ color: "#595959" }} />}
                                                                            disabled
                                                                            label="No"
                                                                        />
                                                                        <FormControlLabel
                                                                            value="Yes"
                                                                            control={<Radio style={{ color: "#595959" }} />}
                                                                            disabled
                                                                            label="Yes" />
                                                                    </div>
                                                                </RadioGroup>
                                                            </Stack>
                                                            <Stack mt={1}>
                                                                <Typography variant="subtitle2" style={{ color: '#ff7424' }}>Procuring inputs for livelihood activity (Yes/No)
                                                                    ಜೀವನೋಪಾಯದ ಚಟುವಟಿಕೆಗಾಗಿ ಒಳಹರಿವು (ಹೌದು/ಇಲ್ಲ)
                                                                </Typography>
                                                                <Typography>

                                                                </Typography>
                                                                <RadioGroup
                                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                                    name="radio-buttons-group"
                                                                    value={sendData.input_procuring_b}
                                                                    disabled
                                                                >
                                                                    <div style={{ display: "flex" }}>
                                                                        <FormControlLabel
                                                                            value="No"
                                                                            control={<Radio style={{ color: "#595959" }} />}
                                                                            disabled
                                                                            label="No"
                                                                        />
                                                                        <FormControlLabel
                                                                            value="Yes"
                                                                            control={<Radio style={{ color: "#595959" }} />}
                                                                            disabled
                                                                            label="Yes" />
                                                                    </div>
                                                                </RadioGroup>
                                                            </Stack>
                                                            <Stack mt={1}>
                                                                <Typography variant="subtitle2" style={{ color: '#ff7424' }}>Selling produce from livelihood activity (Yes/No)
                                                                    ಜೀವನೋಪಾಯದ ಚಟುವಟಿಕೆಯಿಂದ ಉತ್ಪನ್ನಗಳನ್ನು ಮಾರಾಟ ಮಾಡುವುದು (ಹೌದು/ಇಲ್ಲ)
                                                                </Typography>
                                                                <Typography>

                                                                </Typography>
                                                                <RadioGroup
                                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                                    name="radio-buttons-group"
                                                                    value={sendData.selling_produce_b}
                                                                    disabled
                                                                >
                                                                    <div style={{ display: "flex" }}>
                                                                        <FormControlLabel
                                                                            value="No"
                                                                            control={<Radio style={{ color: "#595959" }} />}
                                                                            disabled
                                                                            label="No"
                                                                        />
                                                                        <FormControlLabel
                                                                            value="Yes"
                                                                            control={<Radio style={{ color: "#595959" }} />}
                                                                            disabled
                                                                            label="Yes" />
                                                                    </div>
                                                                </RadioGroup>
                                                            </Stack>
                                                            <Stack mt={1}>
                                                                <Typography variant="subtitle2" style={{ color: '#ff7424' }}>Taking benefit of government schemes (Yes/No)
                                                                    ಸರ್ಕಾರಿ ಯೋಜನೆಗಳ ಲಾಭವನ್ನು ಪಡೆದುಕೊಳ್ಳುವುದು (ಹೌದು/ಇಲ್ಲ)
                                                                </Typography>
                                                                <Typography>

                                                                </Typography>
                                                                <RadioGroup
                                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                                    name="radio-buttons-group"
                                                                    value={sendData.gov_scheme_benefit_b}
                                                                    disabled
                                                                >
                                                                    <div style={{ display: "flex" }}>
                                                                        <FormControlLabel
                                                                            value="No"
                                                                            control={<Radio style={{ color: "#595959" }} />}
                                                                            disabled
                                                                            label="No"
                                                                        />
                                                                        <FormControlLabel
                                                                            value="Yes"
                                                                            control={<Radio style={{ color: "#595959" }} />}
                                                                            disabled
                                                                            label="Yes" />
                                                                    </div>
                                                                </RadioGroup>
                                                            </Stack>
                                                        </CardContent>
                                                    </Card>
                                                    <Card style={{ marginTop: 10, borderRadius: 20 }}>
                                                        <CardContent>
                                                            <Typography variant="subtitle2" style={{ color: '#ff7424' }}>

                                                                Menstrual Hygiene and Environment  ಮುಟ್ಟಿನ ನೈರ್ಮಲ್ಯ ಮತ್ತು ಪರಿಸರ
                                                            </Typography>
                                                            <Stack mt={2} mb={2}>
                                                                <TextField
                                                                    id="twoquestions"
                                                                    label="Your Answer"
                                                                    value={sendData?.menstrual_hygiene_env}
                                                                    disabled
                                                                    variant="outlined"
                                                                    color="common"
                                                                />
                                                            </Stack>
                                                        </CardContent>
                                                    </Card>

                                                    <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                                                        <CardContent>
                                                            <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                                According to you, state whether the following practices are environment friendly or not? <br />
                                                                ನಿಮ್ಮ ಪ್ರಕಾರ, ಈ ಕೆಳಗಿನ ಅಭ್ಯಾಸಗಳು ಪರಿಸರ ಸ್ನೇಹಿ ಅಥವಾ ಇಲ್ಲವೇ ಎಂಬುದನ್ನು ತಿಳಿಸಿ?
                                                            </Typography>
                                                            <Stack mt={2} mb={2}>
                                                                <FormGroup>
                                                                    {environmentalPractices.map((item) => (
                                                                        <FormControlLabel
                                                                            key={item.id}
                                                                            control={
                                                                                <Checkbox
                                                                                    color="primary"
                                                                                    checked={sendData.env_friendly_practices.includes(item.name)}
                                                                                    disabled
                                                                                />
                                                                            }
                                                                            label={item.name}
                                                                        />
                                                                    ))}
                                                                </FormGroup>
                                                            </Stack>
                                                        </CardContent>
                                                    </Card>

                                                    <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                                                        <CardContent>
                                                            <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                                What menstrual product do you use? <br />
                                                                ನೀವು ಯಾವ ಮುಟ್ಟಿನ ಉತ್ಪನ್ನವನ್ನು ಬಳಸುತ್ತೀರಿ?
                                                            </Typography>
                                                            <Stack mt={2} mb={2}>
                                                                <FormGroup>
                                                                    {hygieneProducts.map((item) => (
                                                                        <FormControlLabel
                                                                            key={item.id}
                                                                            control={
                                                                                <Checkbox
                                                                                    color="primary"
                                                                                    checked={sendData.menstrual_product_used.includes(item.name)}
                                                                                    disabled
                                                                                />
                                                                            }
                                                                            label={item.name}
                                                                        />
                                                                    ))}
                                                                </FormGroup>
                                                            </Stack>
                                                        </CardContent>
                                                    </Card>


                                                    <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                                                        <CardContent>
                                                            <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                                How do you dispose of your menstrual product? <br />
                                                                ನೀವು ನಿಮ್ಮ ಮುಟ್ಟಿನ ಉತ್ಪನ್ನವನ್ನು ಹೇಗೆ ವಿಲೇವಾರಿ ಮಾಡುತ್ತೀರಿ?
                                                            </Typography>
                                                            <Stack mt={2} mb={2}>
                                                                <FormGroup>
                                                                    {actions.map((item) => (
                                                                        <FormControlLabel
                                                                            key={item.id}
                                                                            control={
                                                                                <Checkbox
                                                                                    color="primary"
                                                                                    checked={sendData.menstrual_disposal_method.includes(item.name)}
                                                                                    disabled
                                                                                />
                                                                            }
                                                                            label={item.name}
                                                                        />
                                                                    ))}
                                                                </FormGroup>
                                                            </Stack>
                                                        </CardContent>
                                                    </Card>

                                                    <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                                                        <CardContent>
                                                            <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                                                                What cooking fuel do you use at home? <br />
                                                                ನೀವು ಮನೆಯಲ್ಲಿ ಯಾವ ಅಡುಗೆ ಇಂಧನವನ್ನು ಬಳಸುತ್ತೀರಿ?
                                                            </Typography>
                                                            <Stack mt={2} mb={2}>
                                                                <FormGroup>
                                                                    {cookingMethods.map((item) => (
                                                                        <FormControlLabel
                                                                            key={item.id}
                                                                            control={
                                                                                <Checkbox
                                                                                    color="primary"
                                                                                    checked={sendData.cooking_fuel_type.includes(item.name)}
                                                                                    disabled
                                                                                />
                                                                            }
                                                                            label={item.name}
                                                                        />
                                                                    ))}
                                                                </FormGroup>
                                                            </Stack>
                                                        </CardContent>
                                                    </Card>
                                                </>
                                                :
                                                null
                                        }
                                    </>}
                        </DialogContentText></DialogContent>
                </form>
            </Dialog>
        </div>
    );
}