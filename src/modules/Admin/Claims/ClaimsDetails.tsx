import React, { useState } from "react"
import {
  Box,
  Button,
  Flex,
  Stack,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react"
import { BsEye } from "react-icons/bs"
import { CellContext, ColumnDef } from "@tanstack/react-table"
import StyledTable from "@/reusables/StyledTable"
import AcceptClaimModal from "./components/AcceptClaimModal"
import RejectClaimModal from "./components/RejectClaimModal"
import ViewReceiptModal from "@/reusables/ViewReceiptModal"
import { useNavigate } from "react-router-dom"
import { formatToCurrency } from "@/utils/formatToCurrency"
import { formatDate } from "@/utils/formatDate"
import { format } from "date-fns"
import { mockClaimsDetails, mockClaimsList } from "@/data/claims" // Import mock data

interface HistoryColorMap {
  [key: string]: {
    bg: string
    color: string
  }
}

const historyColorMap: HistoryColorMap = {
  initiated: {
    bg: "#DFE5FD",
    color: "#071655",
  },
  inReview: {
    bg: "#DCDBDD",
    color: "#202020",
  },
  processing: {
    bg: "#FEF0C7",
    color: "#DC6803",
  },
  approved: {
    bg: "#9BFDD4",
    color: "#027A48",
  },
  rejected: {
    bg: "#F7CECA",
    color: "#D92D20",
  },
}

const ClaimsDetails: React.FC = () => {
  const [tableParams, setTableParams] = useState({
    pageSize: 10,
    page: 1,
  })

  const _updateParams = ({ filterValues }: { filterValues: any }) => {
    setTableParams({ ...tableParams, ...filterValues })
  }

  const agentStatus = {
    alignItems: "center",
    justifyContent: "space-between",
    background: "#EEF1FD",
    px: "20px",
  }
  const agentName = {
    color: "#0B1023",
    lineHeight: "100%",
    fontSize: "20px",
    fontWeight: 700,
    fontStyle: "normal",
    textTransform: "capitalize",
  }

  const spaceFlex = {
    justifyContent: "space-between",
    alignItems: "center",
  }

  type ClaimsData = {
    planInformation: string
    claimAmount: string
    totalClaim: string
    totalRemittance: string
    lastPaymentDate: string
    supportingDocuments: { url: string }[]
    status: string
  }

  type OtherClaimsData = {
    planInformation: string
    amount: string
    status: string
    reason: string
    supportingDocuments: { url: string }[]
    createdAt: string
  }

  const navigate = useNavigate()

  const claimsColumns: ColumnDef<ClaimsData>[] = [
    {
      accessorKey: "planInformation",
      header: "Use of Property",
    },
    {
      accessorKey: "claimAmount",
      header: "Amount",
      cell: (info: CellContext<ClaimsData, any>) => {
        return <Text>{formatToCurrency(info.getValue())}</Text>
      },
    },
    {
      accessorKey: "totalClaim",
      header: "Total claims",
      cell: (info: CellContext<ClaimsData, any>) => {
        return <Text>{formatToCurrency(info.getValue())}</Text>
      },
    },
    {
      accessorKey: "totalRemittance",
      header: "Total Remittance",
      cell: (info: CellContext<ClaimsData, any>) => {
        return <Text>{formatToCurrency(info.getValue())}</Text>
      },
    },
    {
      accessorKey: "lastPaymentDate",
      header: "Last Payment Date",
      cell: (info: CellContext<ClaimsData, any>) => {
        return <Text>{formatDate(info.getValue())}</Text>
      },
    },
    {
      accessorKey: "supportingDocuments",
      header: "Documents",
      cell: (info: CellContext<ClaimsData, any>) => {
        const images: string[] = info
          .getValue()
          .map((document: { url: string }) => document.url)

        return <ViewReceiptModal images={images} />
      },
    },
    {
      accessorKey: "status",
      header:
        mockClaimsDetails.data.status === "Approved" ||
        mockClaimsDetails.data.status === "Rejected"
          ? undefined
          : "Actions",
      cell: () => {
        if (
          mockClaimsDetails.data.status === "Approved" ||
          mockClaimsDetails.data.status === "Rejected"
        ) {
          return <Box></Box>
        }
        return (
          <Flex gap="10px">
            <AcceptClaimModal
              customerId={mockClaimsDetails.data.customerDetails.id}
              claimId={mockClaimsDetails.data.id}
            />
            <RejectClaimModal
              customerId={mockClaimsDetails.data.customerDetails.id}
              claimId={mockClaimsDetails.data.id}
            />
          </Flex>
        )
      },
    },
  ]

  const otherClaimsColumns: ColumnDef<OtherClaimsData>[] = [
    {
      accessorKey: "planInformation",
      header: "Use of Property",
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: (info: CellContext<OtherClaimsData, any>) => {
        return <Text>{formatToCurrency(info.getValue())}</Text>
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (info: CellContext<OtherClaimsData, any>) => (
        <Flex
          justifyContent={"flex-start"}
          alignSelf="center"
          h="26px"
          borderRadius="4px"
          fontSize="12px"
          fontWeight="500"
        >
          <Text
            bgColor={
              historyColorMap[info.getValue().toLowerCase()]?.bg || "#DCDBDD"
            }
            color={
              historyColorMap[info.getValue().toLowerCase()]?.color || "#202020"
            }
            h="100%"
            p="4px 8px"
          >
            {info.getValue().toLowerCase() === "disapproved"
              ? "Rejected"
              : info.getValue()}
          </Text>
        </Flex>
      ),
    },
    {
      accessorKey: "reason",
      cell: (info: CellContext<OtherClaimsData, any>) => (
        <Tooltip label={info.getValue()}>
          <Text
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            maxWidth="60px"
            overflow="hidden"
          >
            {info.getValue()}
          </Text>
        </Tooltip>
      ),
    },
    {
      accessorKey: "supportingDocuments",
      header: "Documents",
      cell: (info: CellContext<OtherClaimsData, any>) => {
        const images: string[] = info
          .getValue()
          .map((document: { url: string }) => document.url)

        return <ViewReceiptModal images={images} />
      },
    },
    {
      accessorKey: "createdAt",
      header: "Date Initiated",
      cell: (info: CellContext<OtherClaimsData, any>) => {
        return <Text>{formatDate(info.getValue())}</Text>
      },
    },
  ]

  return (
    <Box bgColor="#f6f6f6" h="100vh">
      <Flex sx={agentStatus} h={{ base: "68px" }}>
        <Flex sx={spaceFlex}>
          <Text sx={agentName}>
            {mockClaimsDetails.data.customerDetails.customerName} |{" "}
            {mockClaimsDetails.data.customerDetails.customerCode}
          </Text>
        </Flex>

        <Button
          variant="app-primary"
          fontWeight="normal"
          size="sm"
          rightIcon={<BsEye />}
          onClick={() =>
            navigate(`/customers/${mockClaimsDetails.data.customerDetails.id}`)
          }
        >
          View Customer
        </Button>
      </Flex>
      <Box sx={{ m: "20px" }}>
        <Box mb={"24px"} p="20px" bg="#fff">
          <StyledTable
            data={mockClaimsDetails.data ? [mockClaimsDetails.data] : []}
            columns={claimsColumns}
            loading={false}
            paddingBottom="23px"
          />
        </Box>

        <Flex justifyContent={"space-between"} mb="20px" gap="20px">
          <Box bgColor={"white"} w="40%" px="24px" py="20px">
            <Text
              fontWeight={700}
              fontSize="20px"
              color={"brand.primary"}
              mb="12px"
            >
              Claim Reason
            </Text>
            <Text fontWeight={400} fontSize="14px">
              {mockClaimsDetails.data.reason}
            </Text>
          </Box>
          <Box bgColor={"white"} w="60%" px="20px" py="20px">
            <Text
              fontWeight={700}
              fontSize="20px"
              color={"brand.primary"}
              mb="12px"
            >
              Claim History
            </Text>

            {mockClaimsDetails.data.claimHistory.map(
              ({ id, event, message, createdAt }, index) => (
                <VStack key={id} align="start">
                  <Stack direction="row" spacing={4} align="center" mb="24px">
                    <Box position="relative">
                      <Box
                        w="26px"
                        h="26px"
                        bgColor={"brand.primary"}
                        borderRadius="50%"
                      ></Box>
                      {index > 0 && (
                        <Box
                          position="absolute"
                          border="1px dashed"
                          borderColor={"brand.primary"}
                          h="24px"
                          bottom="100%"
                          left="45%"
                        ></Box>
                      )}
                    </Box>
                    <Box minWidth="80px">
                      <Text
                        key={id}
                        width="fit-content"
                        fontWeight={600}
                        px="8px"
                        py="4px"
                        bgColor={historyColorMap[event.toLowerCase()]?.bg}
                        color={historyColorMap[event.toLowerCase()]?.color}
                        borderRadius="4px"
                        textAlign="center"
                        fontSize="12px"
                      >
                        {event}
                      </Text>
                    </Box>
                    <Box width="200px">
                      <Tooltip label={message}>
                        <Text
                          textOverflow="ellipsis"
                          whiteSpace="nowrap"
                          maxWidth="200px"
                          overflow="hidden"
                          fontSize="12px"
                          fontWeight={600}
                        >
                          {message}
                        </Text>
                      </Tooltip>
                    </Box>
                    <Text
                      key={id}
                      fontSize="12px"
                      color={"#2D4875"}
                      marginLeft="auto"
                    >
                      {createdAt && format(new Date(createdAt), "dd MM yyyy")}
                    </Text>
                  </Stack>
                </VStack>
              )
            )}
          </Box>
        </Flex>

        <Box mt="10px" p="20px" bg="#fff">
          <Text
            sx={{
              color: "brand.primary",
              pb: "12px",
              fontSize: "20px",
              fontWeight: 700,
              fontStyle: "normal",
              textTransform: "capitalize",
            }}
          >
            Other Claims by{" "}
            {mockClaimsDetails.data.customerDetails.customerName}
          </Text>
          <StyledTable
            data={mockClaimsList.data.filter(
              (item) =>
                item.customerName ===
                  mockClaimsDetails.data.customerDetails.customerName &&
                item.id !== mockClaimsDetails.data.id
            )}
            columns={otherClaimsColumns}
            paddingBottom="23px"
            loading={false}
            pagination={{
              pageSize: tableParams.pageSize,
              currentPage: tableParams.page,
              totalPages: mockClaimsList.pagination.numberOfPages,
              updateFn: _updateParams,
            }}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default ClaimsDetails
