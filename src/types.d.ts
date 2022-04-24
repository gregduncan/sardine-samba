type Override<T, U> = Omit<T, keyof U> & U;
type ArrayType<T extends any[]> = T extends (infer U)[] ? U : never;
