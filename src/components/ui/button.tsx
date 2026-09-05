import { Slot, Slottable } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2, LucideIcon } from 'lucide-react';
import * as React from 'react';
import { IconType } from 'react-icons/lib';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-mono text-[11px] font-semibold uppercase tracking-[0.18em] ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'fw-btn fw-btn-ink',
        brand: 'fw-btn fw-btn-primary',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'fw-btn fw-btn-secondary',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        glass: 'fw-glass hover:border-brand',
      },
      size: {
        default: 'h-10 px-5',
        sm: 'h-9 px-4 text-[10px]',
        lg: 'h-12 px-6',
        xl: 'h-14 px-8 text-xs',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

type PropsWithIcon = ButtonProps & {
  icon?: IconType | LucideIcon;
  iconLeft?: undefined;
};

type PropsWithIconLeft = ButtonProps & {
  icon?: undefined;
  iconLeft?: IconType | LucideIcon;
};

type Props = PropsWithIcon | PropsWithIconLeft;

const Button = React.forwardRef<HTMLButtonElement, Props>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isLoading,
      icon: Icon,
      iconLeft: IconLeft,
      disabled,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';
    const isSizeIcon = size === 'icon';
    const Left =
      !isSizeIcon && IconLeft ? (
        isLoading ? (
          <Loader2 className='animate-spin' />
        ) : (
          <IconLeft />
        )
      ) : null;

    const Right =
      !isSizeIcon && !IconLeft && isLoading ? (
        <Loader2 className='animate-spin' />
      ) : Icon ? (
        <Icon />
      ) : null;

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={isLoading || disabled}
        ref={ref}
        {...props}
      >
        {Left}
        <Slottable>
          {isSizeIcon && isLoading ? (
            <Loader2 className='animate-spin' />
          ) : (
            props.children
          )}
        </Slottable>
        {Right}
      </Comp>
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
