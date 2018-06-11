export const data = {
    dependencies : () => ({
        d1: () => false,
        d2: () => false
    }),
    nodes : () => ({
        n0: () => ({
            n2 : true,
            n3 : true
        }),
        n1: () => ({
            n0 : true,
            n3 : true,
            n4 : dependencies().d1
        }),
        n2: () => ({
            n0: true, 
            n4: true
        }),
        n3: () => ({
            n4: true,
            n5: true
        }),
        n4: () => ({
            n1: dependencies().d2,
            n2: true,
            n3: true
        }),
        n5: () => ({})
    })
}