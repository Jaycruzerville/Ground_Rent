/* eslint-disable @typescript-eslint/no-empty-function */
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Icon,
  InputGroup,
  InputRightElement,
  Select,
  Text,
  // useToast,
  Spacer,
} from "@chakra-ui/react"
import { useState } from "react"
// import { useQuery } from "@tanstack/react-query"
import searchLight from "@/assets/search-light.svg"
import StyledTable from "@/reusables/StyledTable"
import { CellContext, ColumnDef } from "@tanstack/react-table"
import { useNavigate } from "react-router-dom"
import Filter from "@/reusables/Filter"
import AddProperty from "./components/AddProperty"
// import SuperAdminService from "@/services/superAdminServices"
// import { IError } from "@/types"
import { format } from "date-fns"
import { BiSort } from "react-icons/bi"

type Agent = {
  id: string
  firstName: string
  lastName: string
  agentCode: string
  phoneNumber: string
  businessAddress: string
  registeredUsers: string
  status: string
  lastActiveDate: string
  dateCreated?: string
  createdAt?: string
}

const mockPropertyData = [
  {
    id: "1",
    PropertyName: "Sunset Boulevard",
    PropertyCategory: "Residential",
    PropertyAddress: "123 West End",
    PropertyState: "Abia State",
    PropertyLGA: "Efrik",
    registeredUsers: "150",
    status: "VERIFIED",
    lastActiveDate: "2022-04-12",
    dateCreated: "2021-06-10",
  },
  {
    id: "2",
    PropertyName: "Ocean View",
    PropertyCategory: "Commercial",
    PropertyAddress: "456 East Side",
    PropertyState: "Lagos State",
    PropertyLGA: "Amuwo Odofin",
    registeredUsers: "75",
    status: "PENDING",
    lastActiveDate: "2022-02-18",
    dateCreated: "2021-09-15",
  },
  {
    id: "3",
    PropertyName: "Humble Beam",
    PropertyCategory: "Industrial",
    PropertyAddress: "456 East Side",
    PropertyState: "Ekiti State",
    PropertyLGA: "Ado ",
    registeredUsers: "75",
    status: "DECLINED",
    lastActiveDate: "2022-02-18",
    dateCreated: "2021-09-15",
  },
  {
    id: "4",
    PropertyName: "View Port",
    PropertyCategory: "Land",
    PropertyAddress: "456 Emies",
    PropertyState: "Lagos State",
    PropertyLGA: "Ikorudu",
    registeredUsers: "75",
    status: "DECLINED",
    lastActiveDate: "2022-02-18",
    dateCreated: "2021-09-15",
  },
  {
    id: "5",
    PropertyName: "View Port",
    PropertyCategory: "Land",
    PropertyAddress: "456 Emies",
    PropertyState: "Lagos State",
    PropertyLGA: "Ikorudu",
    registeredUsers: "75",
    status: "PENDING",
    lastActiveDate: "2022-02-18",
    dateCreated: "2021-09-15",
  },
  {
    id: "6",
    PropertyName: "View Port",
    PropertyCategory: "Land",
    PropertyAddress: "456 Emies",
    PropertyState: "Lagos State",
    PropertyLGA: "Ikorudu",
    registeredUsers: "75",
    status: "VERIFIED",
    lastActiveDate: "2022-02-18",
    dateCreated: "2021-09-15",
  },
  {
    id: "7",
    PropertyName: "View Port",
    PropertyCategory: "Land",
    PropertyAddress: "456 Emies",
    PropertyState: "Lagos State",
    PropertyLGA: "Ikorudu",
    registeredUsers: "75",
    status: "PENDING",
    lastActiveDate: "2022-02-18",
    dateCreated: "2021-09-15",
  },
  {
    id: "8",
    PropertyName: "View Port",
    PropertyCategory: "Land",
    PropertyAddress: "456 Emies",
    PropertyState: "Lagos State",
    PropertyLGA: "Ikorudu",
    registeredUsers: "75",
    status: "VERIFIED",
    lastActiveDate: "2022-02-18",
    dateCreated: "2021-09-15",
  },
  {
    id: "9",
    PropertyName: "View Port",
    PropertyCategory: "Land",
    PropertyAddress: "456 Emies",
    PropertyState: "Lagos State",
    PropertyLGA: "Ikorudu",
    registeredUsers: "75",
    status: "PENDING",
    lastActiveDate: "2022-02-18",
    dateCreated: "2021-09-15",
  },
  {
    id: "10",
    PropertyName: "View Port",
    PropertyCategory: "Land",
    PropertyAddress: "456 Emies",
    PropertyState: "Lagos State",
    PropertyLGA: "Ikorudu",
    registeredUsers: "75",
    status: "DECLINED",
    lastActiveDate: "2022-02-18",
    dateCreated: "2021-09-15",
  },
  // ... add more properties as needed
]

const columns: ColumnDef<Agent>[] = [
  {
    accessorKey: "PropertyName",
    header: ({ column }) => (
      <Button
        paddingLeft={0}
        gap="4px"
        _hover={{ backgroundColor: "none" }}
        _active={{ background: "none" }}
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name <Icon as={BiSort} color="brand.primary" />
      </Button>
    ),
  },
  {
    accessorKey: "PropertyCategory",
    header: "Category",
  },
  {
    accessorKey: "PropertyAddress",
    header: "Location",
  },
  {
    accessorKey: "PropertyState",
    header: "State",
  },
  {
    accessorKey: "PropertyLGA",
    header: "LGA",
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <Button
        paddingLeft={0}
        gap="4px"
        _hover={{ backgroundColor: "none" }}
        _active={{ background: "none" }}
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Status <Icon as={BiSort} color="brand.primary" />
      </Button>
    ),
  },

  {
    accessorKey: "dateCreated",
    header: "Date Created",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cell: (info: CellContext<Agent, any>) => (
      <Box>{format(new Date(info.getValue()), "yyyy-MM-dd")}</Box>
    ),
  },
]

const initParams = {
  searchQuery: "",
  status: "",
  registeredUsers: "",
}

const index = () => {
  const navigate = useNavigate()
  // const toast = useToast()
  const [tableParams, setTableParams] = useState({
    ...initParams,
    pageSize: 10,
    page: 1,
  })
  const [filters, setFilters] = useState(initParams)
  // const deferredSearchValue = useDeferredValue(tableParams.searchQuery)
  interface Params {
    param?: string
    value?: number | string
    filterValues?: Record<string, unknown>
  }

  const updateParams = ({ param, value, filterValues }: Params) => {
    if (param) {
      setTableParams({ ...tableParams, [param]: value })
    } else {
      setTableParams({ ...tableParams, ...filterValues })
    }
  }

  const onFilter = () => {
    updateParams({ filterValues: filters })
  }

  const updateFilters = (filter: string, value: unknown) => {
    setFilters({ ...filters, [filter]: value })
  }

  const [PropertyList] = useState(mockPropertyData)

  // const { data: PropertyListold, isLoading: loadingProperty } = useQuery({
  //   queryKey: [
  //     "Property",
  //     {
  //       pageSize: tableParams.pageSize,
  //       page: tableParams.page,
  //       searchQuery: deferredSearchValue,
  //       status: tableParams.status,
  //     },
  //   ],
  //   queryFn: SuperAdminService.getProperty,
  //   onError: (error: IError) => {
  //     toast({
  //       title: "Error",
  //       description: error?.message,
  //       status: "error",
  //       duration: 5000,
  //       isClosable: true,
  //       position: "top",
  //     })
  //   },
  // })

  return (
    <>
      <Box bgColor="brand.bgLight" alignItems="center" p="25">
        <Flex alignItems="center" justifyContent="space-between">
          <Heading fontSize="20px" color="#0B1023">
            All Properties
          </Heading>
          <Spacer />
          <InputGroup width="237px">
            <InputRightElement height="100%">
              <Image src={searchLight} />
            </InputRightElement>
            <Input
              placeholder="Search"
              fontSize="12px"
              borderRadius="4px"
              height="28px"
              border="1px solid #C0C9D8"
              bgColor="#ffffff"
              _placeholder={{
                fontSize: "10px",
                letterSpacing: "-0.02em",
                lineHeight: "12px",
                color: "#D5D5D5",
              }}
              _hover={{ borderColor: "none" }}
              _focusVisible={{ borderColor: "none", boxShadow: "none" }}
              onChange={(e) =>
                updateParams({ param: "searchQuery", value: e.target.value })
              }
            />
          </InputGroup>
          <Flex gap="8px" alignItems="center">
            <Filter
              handleFilter={onFilter}
              handleClear={() => {
                setFilters(initParams)
                updateParams({ filterValues: initParams })
              }}
            >
              <Text
                fontWeight="500"
                lineHeight="25px"
                fontSize="20px"
                letterSpacing="-1px"
                pb="12px"
              >
                Status
              </Text>
              <Flex gap="12px">
                <FormControl width="50%">
                  <FormLabel
                    lineHeight="20px"
                    fontWeight="500"
                    fontSize="0.75rem"
                    color="#003E51"
                  >
                    Status
                  </FormLabel>
                  <Select
                    placeholder="Select User Status"
                    _placeholder={{ color: "#003E51" }}
                    name="status"
                    value={filters.status}
                    fontSize="14px"
                    _hover={{ outline: "none" }}
                    _focusVisible={{ borderColor: "none", boxShadow: "none" }}
                    height="48px"
                    onChange={(e) => updateFilters("status", e.target.value)}
                  >
                    <option value="">All</option>
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                  </Select>
                </FormControl>
              </Flex>
              <Text
                fontWeight="500"
                lineHeight="25px"
                fontSize="20px"
                letterSpacing="-1px"
                pt="20px"
                pb="12px"
              >
                Date
              </Text>
              <Flex gap="12px" width="100%" mb="5rem">
                <FormControl width="50%">
                  <FormLabel
                    lineHeight="20px"
                    fontWeight="500"
                    fontSize="0.75rem"
                    color="#003E51"
                  >
                    Date Created
                  </FormLabel>
                  <Input
                    size="lg"
                    width="100%"
                    placeholder="Select Date"
                    px="14px"
                    type="date"
                    name="dateCreated"
                    _hover={{ outline: "none" }}
                    _focusVisible={{ borderColor: "none", boxShadow: "none" }}
                    max={new Date().toISOString().split("T")[0]}
                    onChange={(e) =>
                      updateFilters("dateCreated", e.target.value)
                    }
                  />
                </FormControl>
                <FormControl width="50%">
                  <FormLabel
                    lineHeight="20px"
                    fontWeight="500"
                    fontSize="0.75rem"
                    color="#003E51"
                  >
                    Last Active Date
                  </FormLabel>
                  <Input
                    px="14px"
                    width="100%"
                    size="lg"
                    placeholder="Select Date"
                    name="lastActiveDate"
                    type="date"
                    _hover={{ outline: "none" }}
                    _focusVisible={{ borderColor: "none", boxShadow: "none" }}
                    max={new Date().toISOString().split("T")[0]}
                    onChange={(e) =>
                      updateFilters("lastActiveDate", e.target.value)
                    }
                  />
                </FormControl>
              </Flex>
            </Filter>
            <AddProperty />
          </Flex>
        </Flex>
        <Box p="20px">
          <StyledTable
            // data={
            //   PropertyList?.data
            //     ? PropertyList?.data?.map((data: Agent) => ({
            //         ...data,
            //         dateCreated: new Date(),
            //       }))
            //     : []
            // }
            data={PropertyList}
            columns={columns}
            loading={false}
            onRowClick={(row) => navigate(`/Property/${row.id}`)}
            // pagination={{
            //   pageSize: tableParams?.pageSize,
            //   currentPage: tableParams?.page,
            //   totalPages: PropertyList?.pagination?.numberOfPages,
            //   updateFn: updateParams,
            // }}
            pagination={{
              pageSize: tableParams?.pageSize,
              currentPage: tableParams?.page,
              totalPages: Math.ceil(
                mockPropertyData.length / tableParams.pageSize
              ),
              updateFn: updateParams,
            }}
          />
        </Box>
      </Box>
    </>
  )
}

export default index
