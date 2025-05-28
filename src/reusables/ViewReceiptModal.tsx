import React from "react"
import {
  Box,
  Button,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react"
import { Document, Page, pdfjs } from "react-pdf"

import Eye from "@/assets/blue-eye-icon.svg"
import Back from "@/assets/back-icon.svg"
import Forward from "@/assets/forward-icon.svg"
import { Link as RouteLink } from "react-router-dom"
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

const ViewReceiptModal = ({ images }: { images: string[] }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const fontFamily = "'Cabinet Grotesk', sans-serif"

  const [currentIndex, setCurrentIndex] = React.useState(0)

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex((currentIndex + 1) % images.length)
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((currentIndex - 1 + images.length) % images.length)
    }
  }
  const toast = useToast()

  return (
    <>
      <Button
        fontSize="12px"
        gap={"4px"}
        width="73px"
        height="24px"
        onClick={(e) => {
          e.stopPropagation()
          onOpen()
          if (images?.length < 1) {
            toast({
              title: "oops!",
              description: "No supporting documents",
              status: "warning",
              duration: 5000,
              isClosable: true,
              position: "top",
            })
          }
        }}
      >
        <Image src={Eye} />
        View
      </Button>

      {images?.length > 0 && (
        <Modal
          closeOnOverlayClick
          isOpen={isOpen}
          onClose={onClose}
          isCentered
          size={"3xl"}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader
              fontSize={"24px"}
              fontWeight={500}
              fontFamily={fontFamily}
              top="24px"
            ></ModalHeader>
            <ModalCloseButton top="25px" />
            <ModalBody pb={6}>
              <Text
                fontSize={"24px"}
                fontWeight={700}
                fontFamily={fontFamily}
                color="#101828"
                textAlign={"center"}
              >
                {`${currentIndex + 1} / ${images.length}`}
              </Text>
              <Flex>
                <button onClick={handlePrev}>
                  <Image
                    src={currentIndex == 0 ? Back : Forward}
                    transform={currentIndex == 0 ? "" : "rotate(180deg)"}
                    mr="31px"
                  />
                </button>
                {images[currentIndex].split(".").pop() == "pdf" ? (
                  <Box w="80%" minH="400px">
                    <Document
                      file={images[currentIndex]}
                      // file={`http://www2.cs.uidaho.edu/~krings/CS449/Notes.S16/449-16-01.pdf`}
                    >
                      <Page pageNumber={1} />
                    </Document>
                  </Box>
                ) : (
                  <Image
                    src={images[currentIndex]}
                    alt=""
                    w="80%"
                    h="80%"
                    maxH={"600px"}
                    minH={"300px"}
                    objectFit="contain"
                  />
                )}
                {images.length > 1 && (
                  <button onClick={handleNext}>
                    <Image
                      src={currentIndex == images.length - 1 ? Back : Forward}
                      transform={currentIndex == 0 ? "" : "rotate(180deg)"}
                      ml="31px"
                    />
                  </button>
                )}
              </Flex>
            </ModalBody>

            <ModalFooter>
              <Button
                bgColor="brand.primary"
                color="white"
                mx={"auto"}
                fontWeight={500}
                as={RouteLink}
                to={images[currentIndex]}
                download="download"
                target="_blank"
                rel="noreferrer"
                size="md"
                _hover={{ bgColor: "brand.primary", opacity: 0.8 }}
              >
                Download
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  )
}

export default ViewReceiptModal
