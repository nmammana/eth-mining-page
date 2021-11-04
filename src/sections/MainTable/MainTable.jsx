import React from 'react'

import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
  } from "@chakra-ui/react"

import './MainTable.scss'; 

export default function MainTable({userLastWeekData}) {
    const {inversion_semana, ganancia_semana, inversion_total, ganancia_total, mh, fecha} = userLastWeekData;
    return (
        <Table variant="simple" className="main-table">
            <Tbody className="table-font">
                <Tr>
                    <Td>Inversión total [ETH]</Td>
                    <Td className="value" isNumeric>{inversion_total}</Td>
                </Tr>
                <Tr>
                    <Td>Ganancia total [ETH]</Td>
                    <Td className="value" isNumeric>{ganancia_total}</Td>
                </Tr>
                <Tr>
                    <Td>Inversión ult. semana [ETH]</Td>
                    <Td className="value" isNumeric>{inversion_semana}</Td>
                </Tr>
                <Tr>
                    <Td>Ganancia ult. semana [ETH]</Td>
                    <Td className="value" isNumeric>{ganancia_semana}</Td>
                </Tr>
                <Tr>
                    <Td>MH/s aportados</Td>
                    <Td className="value" isNumeric>{mh}</Td>
                </Tr>
            </Tbody>
            
            <TableCaption className="update-date">Información actualizada por última vez el día {fecha}</TableCaption>
            </Table>
    )
}
