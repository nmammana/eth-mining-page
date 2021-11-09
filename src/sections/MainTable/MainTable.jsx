import React, { useContext } from 'react'

import {
    Table,
    Tbody,
    Tr,
    Td,
    TableCaption,
  } from "@chakra-ui/react"

import './MainTable.scss'; 
import { CoinsContext } from '../../contexts/CoinsContext';

export default function MainTable({userLastWeekData, roundedSaldo}) {
    const {fecha, MH, inversion} = userLastWeekData;
    const {coins} = useContext(CoinsContext);

    const ethToUsd = (saldo) => {
        return Number.parseFloat(saldo*coins.data.usd).toFixed(2);
    }

    return (
        <Table variant="simple" className="main-table">
            <Tbody className="table-font">
                <Tr>
                    <Td>Inversión total [U$D]</Td>
                    <Td className="value" isNumeric>{inversion}</Td>
                </Tr>
                <Tr>
                    <Td>MH/s aportados</Td>
                    <Td className="value" isNumeric>{MH}</Td>
                </Tr>
                <Tr>
                    <Td>Saldo [ETH]</Td>
                    <Td className="value" isNumeric>{roundedSaldo}</Td>
                </Tr>
                <Tr>
                    <Td>Saldo estimado [U$D]</Td>
                    <Td className="value" isNumeric>{ethToUsd(roundedSaldo)}</Td>
                </Tr>
                
            </Tbody>

            <TableCaption className="quote__message">
                Sujeto a la cotización del dia: <br /> 1ETH = {ethToUsd(1)} USD.
            </TableCaption>
            
            <TableCaption className="update-date">
                Información actualizada por última vez el día {fecha}
            </TableCaption>
        </Table>
    )
}
