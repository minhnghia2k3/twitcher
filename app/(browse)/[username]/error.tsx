"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ErrorPage = () => {
    return (
      <div className="h-full flex flex-col space-y-4 items-center justify-center text-muted-foreground">
        <p className="text-4xl">Something went wrong</p>
        <p>We couldn&apos;t find the user you were looking for.</p>
        <Button variant="secondary" asChild>
          <Link href="/">Go back home</Link>
        </Button>
      </div>
    );
  };
  
  export default ErrorPage;