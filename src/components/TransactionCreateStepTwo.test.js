import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import TransactionCreateStepTwo from "./TransactionCreateStepTwo";

// test('On initial render the pay button is disabled', async () => {
//     render(<TransactionCreateStepTwo sender={{id: "5", uuid: "5"}} receiver={{id: "5", uuid: "5"}} />);

//     expect(await screen.findByRole('button', { name: /pay/i})).toBeDisabled();
// })

test('If an amount and note is entered, the pay button is enabled', async () => {
    render(<TransactionCreateStepTwo sender={{id: "5", uuid: "5"}} receiver={{id: "5", uuid: "5"}} />);
    
    expect(await screen.findByRole('button', { name: /pay/i})).toBeDisabled();

    userEvent.type(screen.getByPlaceholderText(/amount/i), "50");
    userEvent.type(screen.getByPlaceholderText(/add a note/i), "dinner");
    // screen.getByRole('');
    expect(await screen.findByRole('button', { name: /pay/i})).toBeEnabled();
})
