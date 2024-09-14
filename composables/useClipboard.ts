import tippy from 'tippy.js'
import type {Instance as TippyInstance} from 'tippy.js'
import 'tippy.js/dist/tippy.css'

export function useClipboard() {
    const tippyInstance = ref<TippyInstance | null>(null)

    const copyToClipboard = async (text: string, buttonRef: Ref<any>) => {
        try {
            await navigator.clipboard.writeText(text)

            // Get the actual DOM element from the ref
            const element = buttonRef.value?.$el || buttonRef.value

            if (element) {
                if (!tippyInstance.value) {
                    tippyInstance.value = tippy(element, {
                        content: 'Copy link',
                        trigger: 'manual',
                        placement: 'top'
                    })
                }
                if (tippyInstance.value) {
                    tippyInstance.value.setContent('Copied!')
                    tippyInstance.value.show()
                }
                setTimeout(() => {
                    tippyInstance.value?.hide()
                }, 2000)
            }
        } catch (err) {
            console.error('Failed to copy: ', err)
        }
    }

    onUnmounted(() => {
        if (tippyInstance.value) {
            tippyInstance.value.destroy()
        }
    })

    return {
        copyToClipboard
    }
}