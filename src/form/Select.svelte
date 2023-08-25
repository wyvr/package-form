<div class="base">
    <div class="select">
        <select name={id} {id} {required} {disabled} bind:value bind:this={input} on:change={() => dispatch('input', value)}>
            {#each options as option}
            <option value={option.value}>{option.name}</option>
            {/each}
        </select>
    </div>
    {#if $$slots.default}
    <label for={id}><slot /></label>
    {/if}
</div>
