// import useStateAndLGA from "@/hooks/useStateAndLGA"
import AppFormLabel from "@/reusables/AppFormLabel"
import DrawerComponent from "@/reusables/DrawerComponent"
import SuperAdminService from "@/services/superAdminServices"
import { IError } from "@/types"
import {
  Button,
  Flex,
  FormControl,
  // Heading,
  Input,
  Select,
  Text,
  useToast,
  useDisclosure,
} from "@chakra-ui/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { stateofr, lgaofo } from "@/data"
import { useFormik } from "formik"
// import { useState } from "react"
import * as Yup from "yup"

const AddProperty = () => {
  // const [selectedState, setselectedState] = useState("")
  const { isOpen, onOpen, onClose } = useDisclosure()
  // const { LGAs, loadingLGAs } = useStateAndLGA(selectedState)
  const queryClient = useQueryClient()
  const toast = useToast()

  const { mutate, isLoading } = useMutation(SuperAdminService.addSuperAgent, {
    onError: (error: IError) => {
      toast({
        title: "Error",
        description: error?.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      })
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "SuperAgent added successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      })
      queryClient.invalidateQueries({ queryKey: ["superagents"] })
      onClose()
    },
  })

  const { handleChange, handleSubmit, values, errors } = useFormik({
    initialValues: {
      PropertyName: "",
      PropertyDescription: "",
      PropertyAddress: "",
      PropertyCategory: "",
      state: "",
      lga: "",
    },
    validationSchema: Yup.object({
      PropertyName: Yup.string().required("Required"),
      PropertyDescription: Yup.string().required("Required"),
      PropertyAddress: Yup.string().required("Required"),
      PropertyCategory: Yup.string().required("Required"),
      state: Yup.string().required("Required"),
      lga: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      const {
        PropertyName,
        PropertyDescription,
        PropertyAddress,
        state,
        lga,
        ...otherValues
      } = values
      const data = {
        ...otherValues,
        stateId: state,
        lgaId: lga,
        PropertyName,
        PropertyDescription,
        PropertyAddress,
      }
      mutate(data)
    },
  })

  return (
    <DrawerComponent
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
      title="Add new Property"
      buttonText="Add Property"
    >
      <form onSubmit={handleSubmit}>
        <Flex flexDir="column" gap="12px">
          <FormControl isInvalid={!!errors.PropertyName}>
            <AppFormLabel title="Property name" />
            <Input
              type="name"
              placeholder="Enter Property Name"
              fontSize="14px"
              _hover={{ outline: "none" }}
              _focusVisible={{ borderColor: "none", boxShadow: "none" }}
              _placeholder={{ color: "#003E5160" }}
              id="name"
              name="PropertyName"
              height="48px"
              onChange={handleChange}
              value={values.PropertyName}
            />{" "}
            {!!errors.PropertyName && (
              <Text as="span" fontSize="10px" pt="12px" color="red">
                {errors.PropertyName}
              </Text>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors.PropertyCategory}>
            <AppFormLabel title="Select category" />
            <Select
              placeholder="Select Property Category"
              _placeholder={{ color: "#003E5160" }}
              fontSize="14px"
              _hover={{ outline: "none" }}
              _focusVisible={{ borderColor: "none", boxShadow: "none" }}
              name="PropertyCategory"
              onChange={(e) => {
                handleChange(e)
              }}
            >
              {[
                {
                  name: "Residential",
                  id: 1,
                },
                {
                  name: "Commercial",
                  id: 2,
                },
                {
                  name: "Industrial",
                  id: 3,
                },
                {
                  name: "Land",
                  id: 4,
                },
                {
                  name: "Special",
                  id: 5,
                },
                {
                  name: "Investment",
                  id: 6,
                },
              ]?.map(({ name, id }: { name: string; id: number }) => (
                <option value={name} key={id}>
                  {name}
                </option>
              ))}
            </Select>
            {!!errors.PropertyCategory && (
              <Text as="span" fontSize="10px" pt="12px" color="red">
                {errors.PropertyCategory}
              </Text>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors.PropertyDescription}>
            <AppFormLabel title="Description" />
            <Input
              type="name"
              placeholder="Enter Union Name"
              fontSize="14px"
              _hover={{ outline: "none" }}
              _focusVisible={{ borderColor: "none", boxShadow: "none" }}
              _placeholder={{ color: "#003E5160" }}
              id="name"
              name="PropertyDescription"
              height="48px"
              onChange={handleChange}
              value={values.PropertyDescription}
            />{" "}
            {!!errors.PropertyDescription && (
              <Text as="span" fontSize="10px" pt="12px" color="red">
                {errors.PropertyDescription}
              </Text>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors.PropertyAddress}>
            <AppFormLabel title="Address" />
            <Input
              type="text"
              placeholder="Enter Agent Full Address"
              fontSize="14px"
              _hover={{ outline: "none" }}
              _focusVisible={{ borderColor: "none", boxShadow: "none" }}
              _placeholder={{ color: "#003E5160" }}
              id="address"
              name="PropertyAddress"
              height="48px"
              onChange={handleChange}
              value={values.PropertyAddress}
            />{" "}
            {!!errors.PropertyAddress && (
              <Text as="span" fontSize="10px" pt="12px" color="red">
                {errors.PropertyAddress}
              </Text>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors.state}>
            <AppFormLabel title="Select state" />
            <Select
              placeholder="Select Residence State"
              _placeholder={{ color: "#003E5160" }}
              fontSize="14px"
              _hover={{ outline: "none" }}
              _focusVisible={{ borderColor: "none", boxShadow: "none" }}
              name="state"
              // onChange={(e) => {
              //   handleChange(e)
              //   setselectedState(e.target.value)
              // }}
            >
              {stateofr.map((stateofr) => (
                <option key={stateofr} value={stateofr}>
                  {stateofr}
                </option>
              ))}
            </Select>
            {!!errors.state && (
              <Text as="span" fontSize="10px" pt="12px" color="red">
                {errors.state}
              </Text>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors.lga}>
            <AppFormLabel title="Select LGA" />
            <Select
              placeholder={"Select LGA"}
              _placeholder={{ color: "#003E5160" }}
              fontSize="14px"
              _hover={{ outline: "none" }}
              _focusVisible={{ borderColor: "none", boxShadow: "none" }}
              name="lga"
              onChange={handleChange}
              // isDisabled={loadingLGAs}
            >
              {lgaofo.Lagos.map((lga) => (
                <option key={lga} value={lga}>
                  {lga}
                </option>
              ))}
            </Select>
            {!!errors.state && (
              <Text as="span" fontSize="10px" pt="12px" color="red">
                {errors.state}
              </Text>
            )}
          </FormControl>

          <Button
            bgColor="brand.primary"
            type="submit"
            color="#ffffff"
            height="48px"
            _hover={{ bgColor: "none", opacity: "0.8" }}
            isLoading={isLoading}
          >
            Add Property
          </Button>
        </Flex>
      </form>
    </DrawerComponent>
  )
}

export default AddProperty
