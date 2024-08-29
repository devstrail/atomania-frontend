<script setup>
    import {onMounted, ref, watch} from 'vue';
    import Editor from '@tinymce/tinymce-vue';
    import {useField} from 'vee-validate';
    import AppInputError from '~/components/shared/inputs/AppInputError.vue';

    // Define props
    const props = defineProps({
        id: {
            type: String,
            default: ''
        },
        name: {
            type: String,
            required: true,
        },
        modelValue: {
            type: String,
            default: ''
        },
        label: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: 'Enter text here...'
        }
    });

    // Define emits
    const emit = defineEmits(['update:modelValue']);

    // Data
    const isEditorReady = ref(false);
    const editorInstance = ref(null);
    const init = {
        toolbar_mode: 'sliding',
        menubar: '', // file edit view insert format tools table help
        plugins: 'preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons',
        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | align numlist bullist | link | table image | lineheight outdent indent| forecolor backcolor removeformat | charmap emoticons | code fullscreen',
        content_style: 'img { max-width: 100%; height: auto; }',
        setup: (editor) => {
            editorInstance.value = editor;
        }
    };
    const editorRef = ref(null);
    const content = ref(props.modelValue);

    const {value, errorMessage} = useField(() => props.name, undefined, {
        syncVModel: true,
    });

    const onEditorChange = () => {
        emit('update:modelValue', content.value);
    };

    watch(() => props.modelValue, (newValue) => {
        if (newValue !== content.value) {
            content.value = newValue;
        }
    });

    const checkTinyMCELoaded = () => {
        if (window.tinymce && window.tinymce.activeEditor) {
            isEditorReady.value = true;
        } else {
            setTimeout(checkTinyMCELoaded, 100);
        }
    };

    onMounted(() => {
        checkTinyMCELoaded();
    });
</script>

<template>
    <div class="relative app-text-editor">
        <label v-if="label" class="block mb-2 text-sm font-medium text-gray-900">{{ label }}</label>
        <Editor
            v-model="value"
            :init="init"
            :placeholder="placeholder"
            @update:modelValue="onEditorChange"
            api-key="fsbw6d7mv5tjhfjo2754q0l1fqb1rbxhnph1snj8g8lsvowv"
            :class="isEditorReady ? 'opacity-100' : 'opacity-0'"
        />
        <app-input-error :error-message="errorMessage"/>
    </div>
</template>

<style scoped>
    .app-text-editor {
        margin-bottom: 1rem;
    }

    :global(.tox-statusbar__branding) {
        display: none !important;
    }
</style>