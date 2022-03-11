import { Fragment, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import {
  MenuAlt2Icon,
  XIcon,
  UserCircleIcon,
  ArchiveIcon,
  CreditCardIcon,
  CogIcon,
  SupportIcon,
  StarIcon,
  ShoppingBagIcon,
} from "@heroicons/react/outline"
import Link from "next/link"
import { useRouter } from "next/router"
import Logo from "components/Logo"
// import classNames from "utils/classNames"

const navigation = [
  {
    name: "Account",
    slug: "account",
    icon: UserCircleIcon,
  },
  {
    name: "Custom Illustrations",
    slug: "custom-illustrations",
    icon: ArchiveIcon,
  },
  {
    name: "Orders",
    slug: "orders",
    icon: ShoppingBagIcon,
    disabled: true,
  },
  {
    name: "Plan & Billing",
    slug: "plan-billing",
    icon: CreditCardIcon,
    disabled: true,
  },
  {
    name: "Settings",
    slug: "settings",
    icon: CogIcon,
    disabled: true,
  },
  {
    name: "Support",
    slug: "support",
    icon: SupportIcon,
    disabled: true,
  },
  {
    name: "Reviews",
    slug: "reviews",
    icon: StarIcon,
    disabled: true,
  },
]

function classNames(classes) {
  return classes.join(" ")
}

const Buttons = ({ navigation, pathname }) => {
  const getPath = (item) =>
    item.slug !== "account" ? `/account/${item.slug}` : "/account"
  return (
    <>
      {navigation.map((item) => (
        <Link href={getPath(item)} key={item.slug}>
          <a
            disabled={item.disabled}
            className={classNames([
              pathname === getPath(item)
                ? "cursor-default border-black"
                : item.disabled
                ? "cursor-default text-gray-300 "
                : "border-transparent hover:bg-gray-300",
              "group flex items-center rounded-md border-2 px-2 py-2  text-sm font-medium",
            ])}
          >
            <item.icon className="mr-2 h-6 w-6" />
            {item.name}
          </a>
        </Link>
      ))}
    </>
  )
}

const AccountLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const router = useRouter()

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-40 flex md:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative flex w-full max-w-xs flex-1 flex-col  bg-white pt-5 pb-4">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex flex-shrink-0 items-center px-4">
                  <Logo height={36} width={36} />
                </div>
                <div className="mt-5 h-0 flex-1 overflow-y-auto ">
                  <nav className="space-y-1 px-2">
                    <Buttons
                      navigation={navigation}
                      pathname={router.pathname}
                    />
                  </nav>
                </div>
              </div>
            </Transition.Child>
            <div className="w-14 flex-shrink-0" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden drop-shadow-lg md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-grow flex-col overflow-y-auto bg-white pt-5 ">
            <div className="flex flex-shrink-0 items-center px-4">
              <Logo height={36} width={36} />
            </div>
            <div className="mt-5 flex flex-1 flex-col">
              <nav className="flex-1 space-y-1 px-2 pb-4">
                <Buttons navigation={navigation} pathname={router.pathname} />
              </nav>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col md:pl-64">
          <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
            <button
              type="button"
              className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <main>
            <div className="py-6">{children}</div>
          </main>
        </div>
      </div>
    </>
  )
}

export default AccountLayout
