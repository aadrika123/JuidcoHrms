/**
 * Author: Krish
 * status: close
 */

import React from "react";
import { SubHeading } from "@/components/Helpers/Heading";
import PrimaryButton from "@/components/Helpers/Button";
import Link from "next/link";
import { usePathname } from "next/navigation";

type HeaderFactory = "edit" | "add" | "view";
interface HeaderWidgetProps {
  title: string;
  variant: HeaderFactory;
}

export function HeaderWidget(props: HeaderWidgetProps) {
  const pathName = usePathname();

  const EditHeader = (
    <div className="overflow-x-auto flex justify-between pb-[2rem] ">
      <div className="flex items-center">
        <SubHeading className="text-2xl">Edit {props.title}</SubHeading>
      </div>
    </div>
  );

  const AddHeader = (
    <div className="overflow-x-auto flex justify-between pb-[2rem]">
      <div className="flex items-center">
        <SubHeading className="text-2xl">{props.title}</SubHeading>
      </div>
      <div className="flex">
        <Link href={`${pathName}/add`}>
          <PrimaryButton variant="primary" className="rounded-3xl">
            + Add {props.title}
          </PrimaryButton>
        </Link>
      </div>
    </div>
  );

  const ViewHeader = (
    <div className="overflow-x-auto flex justify-between pb-[2rem]">
      <div className="flex items-center">
        <SubHeading className="text-[28px]">{props.title}</SubHeading>
      </div>
    </div>
  );
  return props.variant === "edit"
    ? EditHeader
    : props.variant === "add"
      ? AddHeader
      : props.variant === "view"
        ? ViewHeader
        : null;
}
