import PropTypes from "prop-types"
import {
  // Avatar,
  Box,
  Flex,
  // HStack,
  //VStack,
  Text,
  Icon,
} from "@chakra-ui/react"
import { useLocation, useNavigate } from "react-router-dom"
// import { FiUsers } from "react-icons/fi"
import { ImFilesEmpty } from "react-icons/im"
import { AiOutlineCreditCard } from "react-icons/ai"
// import { IoSettingsOutline } from "react-icons/io5"
// import { IoGiftOutline } from "react-icons/io5"
import { IoIosPeople } from "react-icons/io"
// import { IoMdPeople } from "react-icons/io"
import { MdOutlineNotifications } from "react-icons/md"
import { HiOutlineBuildingOffice } from "react-icons/hi2"

import { RiDashboardFill } from "react-icons/ri"
import { TbLogout } from "react-icons/tb"
import { Admin } from "@/routes/paths"
import Auth from "@/utils/auth"
import React from "react"
// import { useState } from "react"
// import NotificationNumber from "@/reusables/NotificationNumber"

interface SidebarProps {
  isMobileOpen: boolean
}

export const agentMenuItems = [
  {
    title: "Dashboard",
    path: Admin.DASHBOARD,
    icon: RiDashboardFill,
  },
  {
    title: "Claims",
    path: Admin.CLAIMS,
    icon: ImFilesEmpty,
  },
  {
    title: "Properties",
    path: Admin.Property,
    icon: HiOutlineBuildingOffice,
  },
  {
    title: "Charges",
    path: Admin.Charges,
    icon: ImFilesEmpty,
  },
  {
    title: "Users",
    path: Admin.CUSTOMERS,
    icon: IoIosPeople,
  },
  {
    title: "Transactions",
    path: Admin.TRANSACTIONS,
    icon: AiOutlineCreditCard,
  },
  // {
  //   title: "Super Agents",
  //   path: Admin.SUPERAGENTS,
  //   icon: MdLaptopWindows,
  // },
  // {
  //   title: "Service Providers",
  //   path: Admin.SERVICEPROVIDERS,
  //   icon: IoMdPeople,
  // },
  {
    title: "Notifications",
    path: Admin.NOTIFICATIONS,
    icon: MdOutlineNotifications,
  },
  // {
  //   title: "Settings",
  //   path: Admin.SETTINGS,
  //   icon: IoSettingsOutline,
  //   position: "bottom",
  // },
  // {
  //  title: "Logout",
  //  path: "/",
  //  icon: HiOutlineArrowTopRightOnSquare,
  //  position: "bottom",
  // },
]

const logoutItem = {
  title: "Logout",
  path: "/",
  icon: TbLogout,
}

const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const headerHeight = "78px"

  // Active and inactive styles
  const activeBg = "#fff" // white background for active link
  const inactiveBg = "transparent" // transparent for inactive
  const activeColor = "brand.primary" // color for text and icon when active
  const inactiveColor = "#fff" // white color text and icon when inactive

  return (
    <Box
      display={{ base: isMobileOpen ? "block" : "none", md: "block" }}
      position="fixed"
      top={headerHeight}
      left="0"
      h="calc(100vh - 78px)"
      w={{ base: "full", md: "250px" }}
      zIndex={10}
      bg="brand.primary"
      // overflowY="auto"
      p="4"
      transition="all 0.3s ease"
      boxShadow="xl"
    >
      <Flex direction="column" mt="3" h="full" pt="4">
        {agentMenuItems.map(({ title, icon, path }) => {
          const isActive = location.pathname.includes(path) // Adjust if you have nested paths

          return (
            <Box
              key={title}
              bg={isActive ? activeBg : inactiveBg}
              p="12px 20px"
              borderRadius="4px"
              mb="1"
              cursor="pointer"
              onClick={() => {
                if (title === "Logout") {
                  Auth.logOut()
                } else {
                  navigate(path)
                }
              }}
              _hover={{
                bg: isActive ? activeBg : "brand.hover", // some hover color from your theme
              }}
            >
              <Flex align="center">
                <Icon
                  as={icon}
                  color={isActive ? activeColor : inactiveColor}
                  boxSize="6"
                  mr="4"
                />
                <Text
                  color={isActive ? activeColor : inactiveColor}
                  fontWeight={isActive ? "bold" : "normal"}
                  fontSize="sm"
                  display={{ base: "none", md: "block" }}
                >
                  {title}
                </Text>
              </Flex>
            </Box>
          )
        })}
        <Flex direction="column" mt="auto" pb="4">
          <Box
            bg={location.pathname === logoutItem.path ? activeBg : inactiveBg}
            p="12px 20px"
            borderRadius="4px"
            mb="1"
            cursor="pointer"
            onClick={() => {
              Auth.logOut()
            }}
            _hover={{
              bg: "brand.hover",
            }}
          >
            <Flex align="center">
              <Icon
                as={logoutItem.icon}
                color={
                  location.pathname === logoutItem.path
                    ? activeColor
                    : inactiveColor
                }
                boxSize="6"
                mr="4"
              />
              <Text
                color={
                  location.pathname === logoutItem.path
                    ? activeColor
                    : inactiveColor
                }
                fontWeight="bold"
                fontSize="sm"
                display={{ base: "none", md: "block" }}
              >
                {logoutItem.title}
              </Text>
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </Box>
  )
}

Sidebar.propTypes = {
  isMobileOpen: PropTypes.bool.isRequired,
}

export default Sidebar
