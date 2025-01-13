import React, {useEffect} from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    SxProps,
    Theme,
    CardActionArea,
    CardMedia,
    Collapse,
    Button,
    Paper,
    IconButton,
    InputBase,
    Divider,
    Stack,
    InputLabel, Select, MenuItem,
    SelectChangeEvent, FormControl, FormControlLabel, Radio
} from "@mui/material";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SendIcon from '@mui/icons-material/Send';
import { NumericFormat } from 'react-number-format';
import { cardLabel } from "../types/cardLabel";
import EditIcon from '@mui/icons-material/Edit';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useCreateProjectContext } from '../../../contexts/CreateProjectContext';
import {set} from "react-hook-form";

interface InfoCardProps {

    sx?: SxProps<Theme> | undefined;

    updateAction: (newInfo: string) => void;

    cardLabel: cardLabel;

    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

/*type PaymentMethodProps = {
    onUpdate: (cardNumber: string, paymentMethod : string) => void;
}*/

const PaymentMethodCard: React.FC<InfoCardProps> = ({ sx, onClick, cardLabel, updateAction }) => {

    const { /*state, setState,*/ configurations } = useCreateProjectContext();
    const paymentMethods = configurations?.paymentMethods || [''];

    const [expanded, setExpanded] = React.useState(false);
    //const [inputData, setInputData] = React.useState(cardLabel.value);

    const handleExpandClick = () => {
        setExpanded(!expanded);
        onClick;
    };

/*    const handleEditClick = async () => {
        await updateAction(inputData);
        setExpanded(false);
    }*/

    const [paymentMethod, setPaymentMethod] = React.useState(paymentMethods[0]);

    useEffect(() => {
        if (cardLabel.label === "Payment method" && cardLabel.value !== ""){
            setPaymentMethod(cardLabel.value);
        }
    }, [cardLabel]);

    const handleChange = async (event: SelectChangeEvent) => {
        await updateAction(event.target.value as string);
        //setInputData(event.target.value as string);
        setPaymentMethod(event.target.value as string);
        cardLabel.value = event.target.value as string;
        setExpanded(false);
    };

    const handleCLick = async () => {
        if (cardLabel.label === "Payment method" && cardLabel.value == "") {
            await updateAction(paymentMethod);
            cardLabel.value = paymentMethod;
        }
    };

    return (
        <Card
            sx={{
                ...sx,
                mb: 2,
                boxShadow: 3,
                flexDirection: "column",
                width: "100%",
            }}
        >
            <CardActionArea onClick={handleExpandClick}>
                <CardContent>
                    <Stack direction={"row"} justifyContent={"space-between"}>
                        <Stack direction={"row"} gap={"20px"} alignItems={"center"}>
                            <Typography variant="h6">{cardLabel.label}:</Typography>
                            <Typography fontSize={"20px"} variant={"body1"}>
                                {cardLabel.value ? cardLabel.value : "None"}
                            </Typography>
                        </Stack>

                        <IconButton aria-label="edit">
                            <EditNoteIcon />
                        </IconButton>
                    </Stack>
                </CardContent>
            </CardActionArea>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Stack direction="row" justifyContent={"space-between"} gap={"2px"} alignItems={"center"}>
                        <FormControl fullWidth>
                            <InputLabel id="payment-method-label">Payment method</InputLabel>
                                <Select
                                    labelId="payment-method-label"
                                    id="payment-method-select"
                                    value={paymentMethod}
                                    label="Payment method"
                                    onChange={handleChange}
                                    onClick={handleCLick}
                                >
                                    {paymentMethods.map((method) => (
                                        <MenuItem value={method}>{method}</MenuItem>
                                    ))}
                                </Select>
                        </FormControl>
                    </Stack>
                </CardContent>
            </Collapse>
        </Card>
    );
};

export default PaymentMethodCard;
