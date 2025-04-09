import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

export const useCrud = (key, options) => {
    const {
        refetch,
        form,
        setModal,
        setSelectedItem,
        addOrEdit,
        deleteData
    } = options

    const addOrEditMutation = useMutation({
        mutationFn: ({ values, selectedItem }) => {
            return addOrEdit(
                key,
                { ...values },
                selectedItem?.id || false
            )
        },
        onSuccess: async () => {
            await refetch()

            toast.success('Qoshildi!')

            setModal('close')
            setSelectedItem(null)
            form.resetFields()
        },
        onError: (err) => {
            toast.error(`Ошибка: ${err.response?.data?.message || err.message}`)
        }
    })

    const deleteMutation = useMutation({
        mutationFn: (id) => deleteData(key, id),
        onSuccess: async () => {
            await refetch()
            toast.success('Ochirildi!')
        },
        onError: (err) => {
            toast.error(`Ошибка: ${err.response?.data?.message || err.message}`)
        }
    })

    return {
        addOrEditMutation,
        deleteMutation
    }
}
